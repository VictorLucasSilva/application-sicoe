import PropTypes from "prop-types";
import { type JSX, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Divider } from "../Divider";
import { Logo } from "../Logo";
import { Text } from "../Text";

import area2 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area3 from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";
import area4 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area5 from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import area6 from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";
import area from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";

import iconUsers from "../../../assets/icons/icon-no-mod/no-mod-title_user.svg";
import iconEmail from "../../../assets/icons/icon-no-mod/no-mod-title-email.svg";
import iconAudit from "../../../assets/icons/icon-no-mod/no-mod-title-audit.svg";

import iconMailOpen from "../../../assets/icons/icon-no-mod/no-mod-login-lock.svg";
import iconMailClosed from "../../../assets/icons/icon-no-mod/no-mod-login-avatar.svg";

import logoContract from "../../../../../public/icons/logo-contract.svg";
import logoEstablishment from "../../../../../public/icons/logo-establishment.svg";

import arrowDown from "../../../../../public/icons/arrow-down-filled.svg";

import notifyIcon from "../../../../../public/icons/calendar.svg";

import classes from "./styles.module.css";

interface Props {
  theme: "dark" | "light";
  type: "cont" | "login" | "main" | "estab";
  className: any;
  logotipoVector: string;
}

type AreaMenuKey = "users" | "emails" | "audit";
type ProfileMenuKey = "profile" | "logout";

type AreaGerencialDropdownProps = {
  onSelect: (key: AreaMenuKey) => void;
};

type ProfileDropdownProps = {
  onSelect: (key: ProfileMenuKey) => void;
};

type Notification = {
  id: string;
  title: string;
  message: string;
  read: boolean;
  expanded: boolean;
};

type NotificationsDropdownProps = {
  items: Notification[];
  onToggleRead: (id: string) => void;
  onToggleExpanded: (id: string) => void;

  // ✅ novo: diz quais itens precisam de "Ler mais"
  needsReadMore: Record<string, boolean>;

  // ✅ novo: registra o elemento para medir overflow
  registerMessageEl: (id: string, el: HTMLDivElement | null) => void;
};

const AreaGerencialDropdown = ({
  onSelect,
}: AreaGerencialDropdownProps): JSX.Element => {
  return (
    <div className={classes.areaDropdown} role="menu" aria-label="Área gerencial">
      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("users")}
      >
        <img className={classes.areaDropdownIcon} src={iconUsers} alt="" />
        <span className={classes.areaDropdownText}>Gerenciar Usuários</span>
      </button>

      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("emails")}
      >
        <img className={classes.areaDropdownIcon} src={iconEmail} alt="" />
        <span className={classes.areaDropdownText}>Envio de Emails</span>
      </button>

      <button
        type="button"
        className={classes.areaDropdownItem}
        role="menuitem"
        onClick={() => onSelect("audit")}
      >
        <img className={classes.areaDropdownIcon} src={iconAudit} alt="" />
        <span className={classes.areaDropdownText}>Logs para Auditoria</span>
      </button>
    </div>
  );
};

const ProfileDropdown = ({ onSelect }: ProfileDropdownProps): JSX.Element => {
  return (
    <div className={classes.profileDropdown} role="menu" aria-label="Menu do usuário">
      <button
        type="button"
        className={classes.profileDropdownItem}
        role="menuitem"
        onClick={() => onSelect("profile")}
      >
        <span className={classes.profileDropdownText}>Perfil</span>
      </button>

      <button
        type="button"
        className={classes.profileDropdownItem}
        role="menuitem"
        onClick={() => onSelect("logout")}
      >
        <span className={classes.profileDropdownText}>Sair</span>
      </button>
    </div>
  );
};

const NotificationsDropdown = ({
  items,
  onToggleRead,
  onToggleExpanded,
  needsReadMore,
  registerMessageEl,
}: NotificationsDropdownProps): JSX.Element => {
  return (
    <div className={classes.notifyDropdown} role="menu" aria-label="Notificações">
      <div className={classes.notifyHeader}>
        <div className={classes.notifyTitle}>Notificações</div>
        <div className={classes.notifySubtitle}>Últimas notícias do sistema</div>
      </div>

      <div className={classes.notifyHeaderDivider} />

      <div className={classes.notifyList}>
        {items.map((n) => {
          const canExpand = !!needsReadMore[n.id];

          const itemCls = [
            classes.notifyItem,
            !n.read ? classes.notifyItemUnread : "",
            n.read ? classes.notifyItemRead : "",
            n.expanded ? classes.notifyItemExpanded : "",
            !canExpand ? classes.notifyItemNoExpand : "",
          ]
            .filter(Boolean)
            .join(" ");

          const handleToggleExpanded = (): void => {
            if (!canExpand) return;
            onToggleExpanded(n.id);
          };

          return (
            <div
              key={n.id}
              className={itemCls}
              role={canExpand ? "button" : "group"}
              tabIndex={canExpand ? 0 : -1}
              onClick={handleToggleExpanded}
              onKeyDown={(e) => {
                if (!canExpand) return;
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleToggleExpanded();
                }
              }}
            >
              <div className={classes.notifyItemMain}>
                <div className={classes.notifyItemTextBlock}>
                  <div className={classes.notifyItemTitle}>{n.title}</div>

                  <div
                    className={classes.notifyItemMessage}
                    ref={(el) => registerMessageEl(n.id, el)}
                  >
                    {n.message}
                  </div>

                  {/* ✅ Só mostra "Ler mais/menos" se realmente precisar */}
                  {canExpand && (
                    <div className={classes.notifyItemFooterRow}>
                      <span className={classes.notifyReadMore}>
                        {n.expanded ? "Ler menos" : "Ler mais"}
                      </span>
                    </div>
                  )}
                </div>

                {/* ✅ Só vira "lida" quando clicar aqui */}
                <button
                  type="button"
                  className={classes.notifyMailButton}
                  title={n.read ? "Marcar como não lida" : "Marcar como lida"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleRead(n.id);
                  }}
                >
                  <img
                    src={n.read ? iconMailClosed : iconMailOpen}
                    alt=""
                    className={classes.notifyMailIcon}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const Header = ({
  theme,
  type,
  className,
  logotipoVector = "vector.svg",
}: Props): JSX.Element => {
  const navigate = useNavigate();

  const [isAreaOpen, setIsAreaOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);

  const areaRef = useRef<HTMLDivElement | null>(null);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const notifyRef = useRef<HTMLDivElement | null>(null);

  // ✅ refs para medir overflow do texto (e decidir se mostra "Ler mais")
  const messageElsRef = useRef<Record<string, HTMLDivElement | null>>({});
  const registerMessageEl = (id: string, el: HTMLDivElement | null): void => {
    messageElsRef.current[id] = el;
  };

  const [needsReadMore, setNeedsReadMore] = useState<Record<string, boolean>>({});

  const [notifications, setNotifications] = useState<Notification[]>(() => [
    {
      id: "1",
      title: "Atualização do sistema disponível",
      message: "Versão 1.2.0 liberada para contratos. Clique para ver detalhes completos.",
      read: false,
      expanded: false,
    },
    {
      id: "2",
      title: "Manutenção programada",
      message: "Hoje às 22:00 (tempo estimado 15min). Algumas telas podem ficar indisponíveis.",
      read: false,
      expanded: false,
    },
    {
      id: "3",
      title: "Nova regra de anexos",
      message: "Validação extra para PDFs foi ativada. Evita arquivos inválidos e melhora segurança.",
      read: true,
      expanded: false,
    },
    {
      id: "4",
      title: "Melhoria de performance",
      message: "Consultas de contratos ficaram mais rápidas na tela inicial.",
      read: true,
      expanded: false,
    },
    {
      id: "5",
      title: "Aviso de integração",
      message:
        "Integração com base externa foi atualizada. Pode haver reprocessamento. Em caso de inconsistência, contate o suporte com prints e horário aproximado do ocorrido.",
      read: false,
      expanded: false,
    },
    {
      id: "6",
      title: "Novo filtro disponível",
      message: "Você pode filtrar contratos por situação e centro com mais precisão.",
      read: true,
      expanded: false,
    },
    {
      id: "7",
      title: "Ajuste no layout",
      message: "Pequenos ajustes visuais foram aplicados para melhorar a leitura.",
      read: false,
      expanded: false,
    },
    {
      id: "8",
      title: "Atenção: validação",
      message:
        "Algumas validações foram endurecidas no cadastro de usuário. Isso inclui restrições extras para campos obrigatórios e formatação.",
      read: true,
      expanded: false,
    },
    {
      id: "9",
      title: "Logs de auditoria",
      message:
        "Novos eventos passaram a ser registrados para conformidade. A trilha de auditoria agora inclui ações de leitura, filtros aplicados e exportações.",
      read: false,
      expanded: false,
    },
    {
      id: "10",
      title: "Comunicado interno",
      message: "Confira as novas orientações de operação publicadas no sistema.",
      read: true,
      expanded: false,
    },
  ]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  const closeAllDropdowns = (): void => {
    setIsAreaOpen(false);
    setIsProfileOpen(false);
    setIsNotifyOpen(false);
  };

  // ✅ clicar nos títulos manda pra /home
  const goHome = (): void => {
    closeAllDropdowns();
    navigate("/home");
  };

  useEffect(() => {
    const onMouseDown = (e: MouseEvent): void => {
      const target = e.target as Node | null;
      if (!target) return;

      const clickedInsideArea = areaRef.current?.contains(target);
      const clickedInsideProfile = profileRef.current?.contains(target);
      const clickedInsideNotify = notifyRef.current?.contains(target);

      if (!clickedInsideArea && !clickedInsideProfile && !clickedInsideNotify) {
        closeAllDropdowns();
      }
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") closeAllDropdowns();
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  // ✅ mede quais mensagens realmente estão “cortando” (precisam de Ler mais)
  useEffect(() => {
    if (!isNotifyOpen) return;

    const raf = requestAnimationFrame(() => {
      setNeedsReadMore((prev) => {
        let changed = false;
        const next = { ...prev };

        notifications.forEach((n) => {
          // se está expandida, mantém valor já calculado
          if (n.expanded) return;

          const el = messageElsRef.current[n.id];
          if (!el) return;

          const overflow = el.scrollHeight > el.clientHeight + 1;
          if (next[n.id] !== overflow) {
            next[n.id] = overflow;
            changed = true;
          }
        });

        return changed ? next : prev;
      });
    });

    return () => cancelAnimationFrame(raf);
  }, [isNotifyOpen, notifications]);

  const handleAreaSelect = (key: AreaMenuKey): void => {
    closeAllDropdowns();

    if (key === "users") {
      navigate("/usuario");
      return;
    }
    if (key === "emails") {
      navigate("/email");
      return;
    }
    if (key === "audit") {
      navigate("/auditoria");
      return;
    }
  };

  const handleProfileSelect = (key: ProfileMenuKey): void => {
    closeAllDropdowns();

    if (key === "profile") {
      navigate("/home");
      return;
    }
    if (key === "logout") {
      navigate("/");
      return;
    }
  };

  // ✅ só marca como lida quando clicar no botão (sem auto-mark ao expandir)
  const toggleNotifyRead = (id: string): void => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n)),
    );
  };

  // ✅ expandir NÃO mexe em "read"
  const toggleNotifyExpanded = (id: string): void => {
    setNotifications((prev) =>
      prev.map((n) => {
        if (n.id !== id) return { ...n, expanded: false }; // só 1 expandida por vez
        return { ...n, expanded: !n.expanded };
      }),
    );
  };

  const leftTitleIconSrc =
    type === "cont" ? logoContract : type === "estab" ? logoEstablishment : "";

  return (
    <div
      className={`${classes.header} ${classes[`header-${theme}`]} ${classes[`header-${type}`]} ${classes[`header-${theme}-${type}`]}`}
      style={className}
    >
      <div className={`${classes.headerContent} ${classes[`headerContent-${type}`]}`}>
        {["cont", "estab", "main"].includes(type) && (
          <>
            <div className={classes.leftSection}>
              {theme === "light" && ["cont", "estab"].includes(type) && (
                <button
                  type="button"
                  className={classes.titleLinkButton}
                  onClick={goHome}
                  aria-label="Ir para Home"
                >
                  <div className={classes.titleWithIcon}>
                    <img className={classes.titleLeftIcon} src={leftTitleIconSrc} alt="" />

                    <Text
                      className={{
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="high-primary"
                      size="XXX-huge"
                      text={type === "cont" ? "Monitoramento de Contratos" : "Controle de Estabelecimentos"}
                      textClassName={{
                        alignSelf: "unset",
                        color: "var(--colors-brand-secondary-pure)",
                        fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                        fontSize: "var(--header-title-font-size)",
                        fontStyle: "unset",
                        fontWeight: "500",
                        letterSpacing: "0",
                        lineHeight: "var(--header-title-line-height)",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="title"
                      weight="n-a"
                    />
                  </div>
                </button>
              )}

              {theme === "light" && type === "main" && (
                <button
                  type="button"
                  className={classes.titleLinkButton}
                  onClick={goHome}
                  aria-label="Ir para Home"
                >
                  <div className={classes.titleWithIcon}>
                    <Logo
                      application="internal"
                      className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
                      color="secondary"
                      orientation="vertical"
                      size="smaller"
                      vector="vector-3.svg"
                    />
                    <Text
                      className={{
                        display: "inline-flex",
                        flex: "0 0 auto",
                        left: "unset",
                        top: "unset",
                        width: "unset",
                      }}
                      color="high-primary"
                      size="XXX-huge"
                      text="SICOE"
                      textClassName={{
                        alignSelf: "unset",
                        color: "var(--colors-brand-secondary-pure)",
                        fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                        fontSize: "24px",
                        fontStyle: "unset",
                        fontWeight: "500",
                        letterSpacing: "0",
                        lineHeight: "29.8px",
                        whiteSpace: "nowrap",
                        width: "fit-content",
                      }}
                      type="title"
                      weight="n-a"
                    />
                  </div>
                </button>
              )}

              {theme === "dark" && ["cont", "estab"].includes(type) && (
                <button
                  type="button"
                  className={classes.titleLinkButton}
                  onClick={goHome}
                  aria-label="Ir para Home"
                >
                  <div className={classes.titleWithIcon}>
                    <img className={classes.titleLeftIconDark} src={leftTitleIconSrc} alt="" />
                    <div className={classes.titleDark}>
                      {type === "estab" && <>Controle de Estabelecimentos</>}
                      {type === "cont" && <>Monitoramento de Contratos</>}
                    </div>
                  </div>
                </button>
              )}

              {theme === "dark" && type === "main" && (
                <button
                  type="button"
                  className={classes.titleLinkButton}
                  onClick={goHome}
                  aria-label="Ir para Home"
                >
                  <div className={classes.titleWithIcon}>
                    <div className={classes.logoContainer}>
                      <img
                        className={classes.vectorImage}
                        alt="Vector"
                        src="../../../../../public/icons/logo-yellow.svg"
                      />
                    </div>
                    <div className={classes.titleContainer}>
                      <div className={classes.titleDark}>SICOE</div>
                    </div>
                  </div>
                </button>
              )}
            </div>

            <div className={classes.spacer} />
          </>
        )}

        {(type === "cont" ||
          type === "estab" ||
          type === "main" ||
          (theme === "dark" && type === "login")) && (
            <div className={`${classes.rightSection} ${classes[`rightSection-${type}`]}`}>
              {["cont", "estab", "main"].includes(type) && (
                <>
                  {/* 🔔 NOTIFICAÇÕES */}
                  <div className={classes.notifyWrapper} ref={notifyRef}>
                    <button
                      type="button"
                      className={classes.notifyTrigger}
                      onClick={() => {
                        setIsNotifyOpen((v) => !v);
                        setIsAreaOpen(false);
                        setIsProfileOpen(false);
                      }}
                      aria-haspopup="menu"
                      aria-expanded={isNotifyOpen}
                      title="Notificações"
                    >
                      <img className={classes.notifyIcon} src={notifyIcon} alt="" />
                      {!!unreadCount && (
                        <span className={classes.notifyBadge} aria-label={`${unreadCount} não lidas`}>
                          {unreadCount}
                        </span>
                      )}
                    </button>

                    {isNotifyOpen && (
                      <NotificationsDropdown
                        items={notifications}
                        onToggleRead={toggleNotifyRead}
                        onToggleExpanded={toggleNotifyExpanded}
                        needsReadMore={needsReadMore}
                        registerMessageEl={registerMessageEl}
                      />
                    )}
                  </div>

                  <div className={classes.areaDropdownWrapper} ref={areaRef}>
                    <button
                      type="button"
                      className={classes.areaTrigger}
                      onClick={() => {
                        setIsAreaOpen((v) => !v);
                        setIsNotifyOpen(false);
                        setIsProfileOpen(false);
                      }}
                      aria-haspopup="menu"
                      aria-expanded={isAreaOpen}
                    >
                      <img className={classes.areaTriggerIcon} src={iconUsers} alt="" />
                      <span className={classes.areaText}>Área Gerencial</span>

                      <img
                        src={arrowDown}
                        alt=""
                        className={`${classes.dropdownArrowIcon} ${isAreaOpen ? classes.dropdownArrowOpen : ""
                          }`}
                      />
                    </button>

                    {isAreaOpen && <AreaGerencialDropdown onSelect={handleAreaSelect} />}
                  </div>

                  <div className={classes.divider} />

                  {/* PERFIL */}
                  <div className={classes.profileWrapper} ref={profileRef}>
                    <button
                      type="button"
                      className={classes.profileTrigger}
                      onClick={() => {
                        setIsProfileOpen((v) => !v);
                        setIsNotifyOpen(false);
                        setIsAreaOpen(false);
                      }}
                      aria-haspopup="menu"
                      aria-expanded={isProfileOpen}
                    >
                      <img
                        className={classes.areaImage}
                        alt="Área"
                        src={
                          type === "cont" && theme === "light"
                            ? area3
                            : theme === "light" && type === "main"
                              ? area4
                              : type === "estab" && theme === "dark"
                                ? area5
                                : type === "cont" && theme === "dark"
                                  ? area6
                                  : theme === "dark" && type === "main"
                                    ? area
                                    : area2
                        }
                      />
                    </button>

                    {isProfileOpen && <ProfileDropdown onSelect={handleProfileSelect} />}
                  </div>
                </>
              )}

              {type === "login" && (
                <img
                  className={classes.loginImage}
                  alt="Vector"
                  src="../../../../../public/icons/logo-yellow.svg"
                />
              )}
            </div>
          )}

        {theme === "light" && type === "login" && (
          <>
            <Logo
              application="internal"
              className={{ flex: "0 0 auto", left: "unset", top: "unset" }}
              color="secondary"
              orientation="vertical"
              size="smaller"
              vector={logotipoVector}
            />
            <Text
              className={{
                display: "inline-flex",
                flex: "0 0 auto",
                left: "unset",
                top: "unset",
                width: "unset",
              }}
              color="high-primary"
              size="XXX-huge"
              text="SICOE"
              textClassName={{
                alignSelf: "unset",
                color: "var(--colors-brand-secondary-pure)",
                fontFamily: "'BancoDoBrasil Titulos-Medium', Helvetica",
                fontSize: "24px",
                fontStyle: "unset",
                fontWeight: "500",
                letterSpacing: "0",
                lineHeight: "29.8px",
                whiteSpace: "nowrap",
                width: "fit-content",
              }}
              type="title"
              weight="n-a"
            />
          </>
        )}

        {theme === "dark" && type === "login" && (
          <div className={classes.titleContainer}>
            <div className={classes.titleDark}>SICOE</div>
          </div>
        )}
      </div>

      <Divider
        className={{
          alignSelf: "stretch",
          backgroundColor: "var(--colors-brand-primary-light)",
          left: "unset",
          marginTop: "-2px",
          top: "unset",
          width: "100%",
        }}
        style={{ width: "100%" }}
        color="secondary-pure"
        orientation="horizontal"
        size="large"
        theme="light"
      />

      <div className={classes.bbDivider} aria-hidden />
    </div>
  );
};

Header.propTypes = {
  theme: PropTypes.oneOf(["dark", "light"]),
  type: PropTypes.oneOf(["cont", "login", "main", "estab"]),
  logotipoVector: PropTypes.string,
};
