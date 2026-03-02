#!/bin/bash

###############################################################################
# SICOE - Server Setup Script
# Run this script on a fresh server to prepare it for SICOE deployment
###############################################################################

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}SICOE - Server Setup${NC}"
echo -e "${GREEN}=======================================${NC}"
echo ""

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo -e "${RED}Please run as root (use sudo)${NC}"
    exit 1
fi

# Update system
echo -e "${YELLOW}Step 1: Updating system packages...${NC}"
apt-get update
apt-get upgrade -y

# Install Docker
echo -e "${YELLOW}Step 2: Installing Docker...${NC}"
if ! command -v docker &> /dev/null; then
    # Install prerequisites
    apt-get install -y \
        ca-certificates \
        curl \
        gnupg \
        lsb-release

    # Add Docker GPG key
    mkdir -p /etc/apt/keyrings
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg

    # Add Docker repository
    echo \
      "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
      $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

    # Install Docker
    apt-get update
    apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

    echo -e "${GREEN}✓ Docker installed${NC}"
else
    echo -e "${GREEN}✓ Docker already installed${NC}"
fi

# Start and enable Docker
systemctl start docker
systemctl enable docker

# Create sicoe user
echo -e "${YELLOW}Step 3: Creating sicoe user...${NC}"
if ! id sicoe &>/dev/null; then
    useradd -m -s /bin/bash sicoe
    usermod -aG docker sicoe
    echo -e "${GREEN}✓ User sicoe created${NC}"
else
    echo -e "${GREEN}✓ User sicoe already exists${NC}"
fi

# Create application directory
echo -e "${YELLOW}Step 4: Creating application directory...${NC}"
mkdir -p /opt/sicoe/{dev,prod}
chown -R sicoe:sicoe /opt/sicoe
echo -e "${GREEN}✓ Directory created: /opt/sicoe${NC}"

# Install useful tools
echo -e "${YELLOW}Step 5: Installing monitoring tools...${NC}"
apt-get install -y \
    htop \
    iotop \
    nethogs \
    net-tools \
    vim \
    git \
    curl \
    wget

# Configure firewall (UFW)
echo -e "${YELLOW}Step 6: Configuring firewall...${NC}"
apt-get install -y ufw

# Allow SSH
ufw allow 22/tcp

# Allow HTTP/HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable
echo -e "${GREEN}✓ Firewall configured${NC}"

# Configure automatic security updates
echo -e "${YELLOW}Step 7: Configuring automatic security updates...${NC}"
apt-get install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades

# Install fail2ban
echo -e "${YELLOW}Step 8: Installing fail2ban...${NC}"
apt-get install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
echo -e "${GREEN}✓ Fail2ban installed and started${NC}"

# Setup log rotation
echo -e "${YELLOW}Step 9: Configuring log rotation...${NC}"
cat > /etc/logrotate.d/sicoe <<EOF
/opt/sicoe/*/logs/*.log {
    daily
    rotate 30
    compress
    delaycompress
    notifempty
    create 0640 sicoe sicoe
    sharedscripts
}
EOF
echo -e "${GREEN}✓ Log rotation configured${NC}"

# Setup monitoring cron jobs
echo -e "${YELLOW}Step 10: Setting up cron jobs...${NC}"
# Note: User should configure these after deployment
cat > /opt/sicoe/crontab.txt <<EOF
# SICOE Cron Jobs
# Install with: crontab -u sicoe /opt/sicoe/crontab.txt

# Daily backup at 2 AM
0 2 * * * /opt/sicoe/deploy/scripts/backup-db.sh prod >> /var/log/sicoe-backup.log 2>&1

# Weekly health check report (Sunday at 23:00)
0 23 * * 0 /opt/sicoe/deploy/scripts/health-check.sh prod >> /var/log/sicoe-health.log 2>&1

# Clean old Docker images (daily at 3 AM)
0 3 * * * docker image prune -af --filter "until=168h" >> /var/log/sicoe-cleanup.log 2>&1
EOF
chown sicoe:sicoe /opt/sicoe/crontab.txt
echo -e "${GREEN}✓ Cron jobs template created${NC}"
echo -e "${YELLOW}  Install with: crontab -u sicoe /opt/sicoe/crontab.txt${NC}"

# Docker daemon configuration
echo -e "${YELLOW}Step 11: Configuring Docker daemon...${NC}"
cat > /etc/docker/daemon.json <<EOF
{
  "log-driver": "json-file",
  "log-opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "storage-driver": "overlay2"
}
EOF
systemctl restart docker
echo -e "${GREEN}✓ Docker daemon configured${NC}"

echo ""
echo -e "${GREEN}=======================================${NC}"
echo -e "${GREEN}✓ Server setup completed!${NC}"
echo -e "${GREEN}=======================================${NC}"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Copy deployment files to /opt/sicoe/"
echo "2. Configure .env files for each environment"
echo "3. Setup SSH keys for GitHub Actions"
echo "4. Configure SSL certificates (Let's Encrypt)"
echo "5. Install cron jobs: crontab -u sicoe /opt/sicoe/crontab.txt"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  sudo -u sicoe bash           # Switch to sicoe user"
echo "  cd /opt/sicoe                # Go to app directory"
echo "  docker compose ps            # Check services status"
echo "  docker compose logs -f       # View logs"
echo ""
