import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Settings, Plus, Clock, Copy,
  FileText, Globe, GitBranch, Cloud, PlayCircle, BarChart2, 
  Activity, Save, Download, Rocket, 
  DollarSign, XCircle, Edit3, Eye, Target, Trash2,
  ExternalLink, RefreshCw,
  Zap, Database, Check, AlertCircle, Sparkles,
  Upload, Search, GripHorizontal, ChevronDown, Bot, MonitorPlay,
  Code, Star, Mail, Calendar, Video, HardDrive, LayoutDashboard,
  EyeOff, Settings2
} from 'lucide-react';

const cloudTranslations = {
  en: { settings: 'System Preferences', language: 'Language', languageHelp: 'Cloud sync controls use this language on every signed-in device.', cloudTitle: 'Cloud backup & sync', optional: 'Optional Google sign-in to keep one private workspace across devices.', signIn: 'Sign in', manage: 'Manage sync', continue: 'Continue with Google', intro: 'Sign in with Google to keep one private SoloHQ workspace across your devices. Local-only use remains available without an account.', found: 'A cloud workspace was found for {email}. Choose which copy should become your current workspace.', useCloud: 'Use cloud data', useCloudHelp: 'Replace this device with your latest backup.', useDevice: 'Use this device', useDeviceHelp: 'Replace the cloud backup with local data.', signedIn: 'Signed in as {email}. Your projects, notes, bookmarks, preferences, and MRR can sync privately between devices.', summary: 'Signed in as {email}. {state}', inSync: 'Your workspace is in sync.', choose: 'Choose how to sync this device.', syncNow: 'Sync now', done: 'Done', delete: 'Delete cloud data', signOut: 'Sign out', deleteConfirm: 'Delete your cloud backup? Data on this device will stay unchanged.', deleteFailed: 'Could not delete the cloud backup. Please try again.', unavailable: 'Cloud sync is temporarily unavailable. Your local data is safe.', saveFailed: 'Could not save your cloud workspace. Please try again.' },
  zh: { settings: '系统设置', language: '语言', languageHelp: '所有已登录设备上的云同步界面都会使用此语言。', cloudTitle: '云端备份与同步', optional: '可选：使用 Google 登录，在多个设备间保留同一份私有工作区。', signIn: '登录', manage: '管理同步', continue: '使用 Google 继续', intro: '使用 Google 登录，在多个设备间使用同一份私有 SoloHQ 工作区。不登录也可继续仅在本地使用。', found: '已找到 {email} 的云端工作区。请选择要作为当前工作区的版本。', useCloud: '使用云端数据', useCloudHelp: '用最新备份覆盖此设备的数据。', useDevice: '使用此设备数据', useDeviceHelp: '用本机数据覆盖云端备份。', signedIn: '已登录 {email}。项目、笔记、书签、偏好设置和 MRR 可在设备之间私密同步。', summary: '已登录 {email}。{state}', inSync: '工作区已同步。', choose: '请选择此设备的同步方式。', syncNow: '立即同步', done: '完成', delete: '删除云端数据', signOut: '退出登录', deleteConfirm: '删除云端备份吗？此设备上的数据不会改变。', deleteFailed: '无法删除云端备份，请重试。', unavailable: '云端同步暂时不可用；本地数据已安全保留。', saveFailed: '无法保存云端工作区，请重试。' },
  ja: { settings: 'システム設定', language: '言語', languageHelp: 'サインインしたすべてのデバイスで、この言語が同期画面に使われます。', cloudTitle: 'クラウドバックアップと同期', optional: 'Google にログインすると、複数のデバイスで同じプライベートワークスペースを利用できます。', signIn: 'ログイン', manage: '同期を管理', continue: 'Google で続行', intro: 'Google にログインすると、複数のデバイスで同じプライベート SoloHQ ワークスペースを利用できます。ローカルのみでの利用も可能です。', found: '{email} のクラウドワークスペースが見つかりました。現在のワークスペースにするコピーを選択してください。', useCloud: 'クラウドデータを使用', useCloudHelp: 'このデバイスを最新のバックアップで置き換えます。', useDevice: 'このデバイスを使用', useDeviceHelp: 'クラウドのバックアップをローカルデータで置き換えます。', signedIn: '{email} としてログイン済みです。プロジェクト、メモ、ブックマーク、設定、MRR をデバイス間で非公開に同期できます。', summary: '{email} としてログイン済みです。{state}', inSync: 'ワークスペースは同期済みです。', choose: 'このデバイスの同期方法を選択してください。', syncNow: '今すぐ同期', done: '完了', delete: 'クラウドデータを削除', signOut: 'ログアウト', deleteConfirm: 'クラウドバックアップを削除しますか？このデバイスのデータは変更されません。', deleteFailed: 'クラウドバックアップを削除できません。もう一度お試しください。', unavailable: 'クラウド同期は一時的に利用できません。ローカルデータは安全です。', saveFailed: 'クラウドワークスペースを保存できません。もう一度お試しください。' },
  ko: { settings: '시스템 설정', language: '언어', languageHelp: '로그인한 모든 기기에서 이 언어가 동기화 화면에 사용됩니다.', cloudTitle: '클라우드 백업 및 동기화', optional: '선택 사항: Google로 로그인하여 여러 기기에서 하나의 비공개 작업 공간을 사용하세요.', signIn: '로그인', manage: '동기화 관리', continue: 'Google로 계속', intro: 'Google로 로그인하여 여러 기기에서 하나의 비공개 SoloHQ 작업 공간을 사용하세요. 로그인하지 않고 로컬에서만 사용할 수도 있습니다.', found: '{email}의 클라우드 작업 공간을 찾았습니다. 현재 작업 공간으로 사용할 복사본을 선택하세요.', useCloud: '클라우드 데이터 사용', useCloudHelp: '이 기기를 최신 백업으로 교체합니다.', useDevice: '이 기기 사용', useDeviceHelp: '클라우드 백업을 로컬 데이터로 교체합니다.', signedIn: '{email}으로 로그인했습니다. 프로젝트, 메모, 북마크, 환경설정 및 MRR을 기기 간에 비공개로 동기화할 수 있습니다.', summary: '{email}으로 로그인했습니다. {state}', inSync: '작업 공간이 동기화되었습니다.', choose: '이 기기의 동기화 방법을 선택하세요.', syncNow: '지금 동기화', done: '완료', delete: '클라우드 데이터 삭제', signOut: '로그아웃', deleteConfirm: '클라우드 백업을 삭제할까요? 이 기기의 데이터는 변경되지 않습니다.', deleteFailed: '클라우드 백업을 삭제할 수 없습니다. 다시 시도하세요.', unavailable: '클라우드 동기화를 일시적으로 사용할 수 없습니다. 로컬 데이터는 안전합니다.', saveFailed: '클라우드 작업 공간을 저장할 수 없습니다. 다시 시도하세요.' },
  es: { settings: 'Preferencias del sistema', language: 'Idioma', languageHelp: 'Los controles de sincronización usarán este idioma en todos los dispositivos con sesión iniciada.', cloudTitle: 'Copia y sincronización en la nube', optional: 'Inicia sesión con Google para usar un espacio de trabajo privado en varios dispositivos.', signIn: 'Iniciar sesión', manage: 'Gestionar sincronización', continue: 'Continuar con Google', intro: 'Inicia sesión con Google para mantener un espacio de trabajo privado de SoloHQ en todos tus dispositivos. También puedes usarlo solo de forma local.', found: 'Se encontró un espacio de trabajo en la nube para {email}. Elige qué copia será tu espacio de trabajo actual.', useCloud: 'Usar datos en la nube', useCloudHelp: 'Reemplaza este dispositivo con tu última copia de seguridad.', useDevice: 'Usar este dispositivo', useDeviceHelp: 'Reemplaza la copia en la nube con los datos locales.', signedIn: 'Has iniciado sesión como {email}. Tus proyectos, notas, marcadores, preferencias y MRR pueden sincronizarse de forma privada.', summary: 'Sesión iniciada como {email}. {state}', inSync: 'Tu espacio de trabajo está sincronizado.', choose: 'Elige cómo sincronizar este dispositivo.', syncNow: 'Sincronizar ahora', done: 'Listo', delete: 'Eliminar datos en la nube', signOut: 'Cerrar sesión', deleteConfirm: '¿Eliminar tu copia de seguridad en la nube? Los datos de este dispositivo no cambiarán.', deleteFailed: 'No se pudo eliminar la copia en la nube. Inténtalo de nuevo.', unavailable: 'La sincronización en la nube no está disponible temporalmente. Tus datos locales están seguros.', saveFailed: 'No se pudo guardar el espacio de trabajo en la nube. Inténtalo de nuevo.' },
  fr: { settings: 'Préférences système', language: 'Langue', languageHelp: 'Les contrôles de synchronisation utiliseront cette langue sur tous les appareils connectés.', cloudTitle: 'Sauvegarde et synchronisation cloud', optional: 'Connectez-vous avec Google pour utiliser un espace de travail privé sur plusieurs appareils.', signIn: 'Se connecter', manage: 'Gérer la synchronisation', continue: 'Continuer avec Google', intro: 'Connectez-vous avec Google pour conserver un espace de travail SoloHQ privé sur tous vos appareils. L’utilisation locale reste possible sans compte.', found: 'Un espace de travail cloud a été trouvé pour {email}. Choisissez la copie à utiliser.', useCloud: 'Utiliser les données cloud', useCloudHelp: 'Remplace les données de cet appareil par votre dernière sauvegarde.', useDevice: 'Utiliser cet appareil', useDeviceHelp: 'Remplace la sauvegarde cloud par les données locales.', signedIn: 'Connecté en tant que {email}. Vos projets, notes, favoris, préférences et MRR peuvent être synchronisés en privé.', summary: 'Connecté en tant que {email}. {state}', inSync: 'Votre espace de travail est synchronisé.', choose: 'Choisissez comment synchroniser cet appareil.', syncNow: 'Synchroniser', done: 'Terminé', delete: 'Supprimer les données cloud', signOut: 'Se déconnecter', deleteConfirm: 'Supprimer votre sauvegarde cloud ? Les données de cet appareil ne seront pas modifiées.', deleteFailed: 'Impossible de supprimer la sauvegarde cloud. Réessayez.', unavailable: 'La synchronisation cloud est temporairement indisponible. Vos données locales sont en sécurité.', saveFailed: 'Impossible d’enregistrer l’espace de travail cloud. Réessayez.' },
  de: { settings: 'Systemeinstellungen', language: 'Sprache', languageHelp: 'Die Synchronisierungsoberfläche verwendet diese Sprache auf allen angemeldeten Geräten.', cloudTitle: 'Cloud-Backup und Synchronisierung', optional: 'Melde dich mit Google an, um einen privaten Arbeitsbereich auf mehreren Geräten zu verwenden.', signIn: 'Anmelden', manage: 'Synchronisierung verwalten', continue: 'Mit Google fortfahren', intro: 'Melde dich mit Google an, um einen privaten SoloHQ-Arbeitsbereich auf mehreren Geräten zu nutzen. Die lokale Nutzung bleibt ohne Konto möglich.', found: 'Ein Cloud-Arbeitsbereich für {email} wurde gefunden. Wähle die Kopie für diesen Arbeitsbereich.', useCloud: 'Cloud-Daten verwenden', useCloudHelp: 'Ersetzt dieses Gerät durch dein neuestes Backup.', useDevice: 'Dieses Gerät verwenden', useDeviceHelp: 'Ersetzt das Cloud-Backup durch lokale Daten.', signedIn: 'Angemeldet als {email}. Projekte, Notizen, Lesezeichen, Einstellungen und MRR können privat zwischen Geräten synchronisiert werden.', summary: 'Angemeldet als {email}. {state}', inSync: 'Dein Arbeitsbereich ist synchronisiert.', choose: 'Wähle die Synchronisierung für dieses Gerät.', syncNow: 'Jetzt synchronisieren', done: 'Fertig', delete: 'Cloud-Daten löschen', signOut: 'Abmelden', deleteConfirm: 'Cloud-Backup löschen? Die Daten auf diesem Gerät bleiben unverändert.', deleteFailed: 'Cloud-Backup konnte nicht gelöscht werden. Bitte erneut versuchen.', unavailable: 'Die Cloud-Synchronisierung ist vorübergehend nicht verfügbar. Deine lokalen Daten sind sicher.', saveFailed: 'Cloud-Arbeitsbereich konnte nicht gespeichert werden. Bitte erneut versuchen.' },
  pt: { settings: 'Preferências do sistema', language: 'Idioma', languageHelp: 'Os controles de sincronização usarão este idioma em todos os dispositivos conectados.', cloudTitle: 'Backup e sincronização na nuvem', optional: 'Entre com o Google para usar um espaço de trabalho privado em vários dispositivos.', signIn: 'Entrar', manage: 'Gerenciar sincronização', continue: 'Continuar com Google', intro: 'Entre com o Google para manter um espaço de trabalho privado do SoloHQ em todos os seus dispositivos. O uso apenas local continua disponível.', found: 'Encontramos um espaço de trabalho na nuvem para {email}. Escolha qual cópia será usada.', useCloud: 'Usar dados da nuvem', useCloudHelp: 'Substitui este dispositivo pelo backup mais recente.', useDevice: 'Usar este dispositivo', useDeviceHelp: 'Substitui o backup na nuvem pelos dados locais.', signedIn: 'Você entrou como {email}. Projetos, notas, favoritos, preferências e MRR podem ser sincronizados de forma privada.', summary: 'Conectado como {email}. {state}', inSync: 'Seu espaço de trabalho está sincronizado.', choose: 'Escolha como sincronizar este dispositivo.', syncNow: 'Sincronizar agora', done: 'Concluído', delete: 'Excluir dados da nuvem', signOut: 'Sair', deleteConfirm: 'Excluir seu backup na nuvem? Os dados deste dispositivo não serão alterados.', deleteFailed: 'Não foi possível excluir o backup na nuvem. Tente novamente.', unavailable: 'A sincronização na nuvem está temporariamente indisponível. Seus dados locais estão seguros.', saveFailed: 'Não foi possível salvar o espaço de trabalho na nuvem. Tente novamente.' },
  ru: { settings: 'Системные настройки', language: 'Язык', languageHelp: 'Элементы синхронизации будут использовать этот язык на всех устройствах с входом.', cloudTitle: 'Облачная копия и синхронизация', optional: 'Войдите через Google, чтобы использовать одно приватное рабочее пространство на разных устройствах.', signIn: 'Войти', manage: 'Управление синхронизацией', continue: 'Продолжить с Google', intro: 'Войдите через Google, чтобы использовать приватное рабочее пространство SoloHQ на нескольких устройствах. Локальная работа доступна и без аккаунта.', found: 'Найдено облачное рабочее пространство для {email}. Выберите нужную копию.', useCloud: 'Использовать облачные данные', useCloudHelp: 'Заменяет данные этого устройства последней резервной копией.', useDevice: 'Использовать это устройство', useDeviceHelp: 'Заменяет облачную копию локальными данными.', signedIn: 'Вы вошли как {email}. Проекты, заметки, закладки, настройки и MRR можно приватно синхронизировать между устройствами.', summary: 'Вы вошли как {email}. {state}', inSync: 'Рабочее пространство синхронизировано.', choose: 'Выберите способ синхронизации этого устройства.', syncNow: 'Синхронизировать', done: 'Готово', delete: 'Удалить облачные данные', signOut: 'Выйти', deleteConfirm: 'Удалить облачную резервную копию? Данные на этом устройстве не изменятся.', deleteFailed: 'Не удалось удалить облачную копию. Повторите попытку.', unavailable: 'Облачная синхронизация временно недоступна. Локальные данные сохранены.', saveFailed: 'Не удалось сохранить облачное рабочее пространство. Повторите попытку.' },
  ar: { settings: 'تفضيلات النظام', language: 'اللغة', languageHelp: 'ستستخدم عناصر المزامنة هذه اللغة على جميع الأجهزة المسجّل دخولها.', cloudTitle: 'النسخ الاحتياطي والمزامنة السحابية', optional: 'سجّل الدخول باستخدام Google لاستخدام مساحة عمل خاصة واحدة على أجهزة متعددة.', signIn: 'تسجيل الدخول', manage: 'إدارة المزامنة', continue: 'المتابعة باستخدام Google', intro: 'سجّل الدخول باستخدام Google للاحتفاظ بمساحة عمل SoloHQ خاصة واحدة على أجهزتك. يبقى الاستخدام المحلي متاحاً دون حساب.', found: 'تم العثور على مساحة عمل سحابية لـ {email}. اختر النسخة التي ستستخدمها.', useCloud: 'استخدام بيانات السحابة', useCloudHelp: 'يستبدل بيانات هذا الجهاز بأحدث نسخة احتياطية.', useDevice: 'استخدام هذا الجهاز', useDeviceHelp: 'يستبدل النسخة السحابية بالبيانات المحلية.', signedIn: 'تم تسجيل الدخول باسم {email}. يمكن مزامنة المشاريع والملاحظات والإشارات والتفضيلات وMRR بشكل خاص بين الأجهزة.', summary: 'تم تسجيل الدخول باسم {email}. {state}', inSync: 'مساحة العمل متزامنة.', choose: 'اختر طريقة مزامنة هذا الجهاز.', syncNow: 'مزامنة الآن', done: 'تم', delete: 'حذف البيانات السحابية', signOut: 'تسجيل الخروج', deleteConfirm: 'هل تريد حذف النسخة الاحتياطية السحابية؟ لن تتغير بيانات هذا الجهاز.', deleteFailed: 'تعذر حذف النسخة الاحتياطية السحابية. حاول مرة أخرى.', unavailable: 'المزامنة السحابية غير متاحة مؤقتاً. بياناتك المحلية آمنة.', saveFailed: 'تعذر حفظ مساحة العمل السحابية. حاول مرة أخرى.' }
};

const languageOptions = [
  ['en', 'English'], ['zh', '中文'], ['ja', '日本語'], ['ko', '한국어'], ['es', 'Español'],
  ['fr', 'Français'], ['de', 'Deutsch'], ['pt', 'Português'], ['ru', 'Русский'], ['ar', 'العربية']
];

const defaultProjects = [
  {
    id: 'p1',
    name: 'AI SaaS Generator',
    progress: 65,
    status: 'developing',
    hours: 42,
    lastUpdated: Date.now(),
    links: {
      github: 'https://github.com/myorg/ai-saas',
      knowledge: 'https://notebooklm.google.com',
      deploy: 'https://vercel.com',
      demo: 'https://demo-saas.com',
      analytics: 'https://posthog.com'
    },
    memo: '# Dev Log - Aug 2026\n- Integrated Stripe Webhook for auto-MRR calculations.\n- Added LLM API fallback endpoints.\n- TODO: Fix Notion bi-directional sync edge cases.'
  },
  {
    id: 'p2',
    name: 'Billing API Microservice',
    progress: 100,
    status: 'revenue',
    hours: 150,
    lastUpdated: Date.now() - 3600000,
    links: {
      github: 'https://github.com/myorg/billing-api',
      knowledge: '',
      deploy: 'https://aws.amazon.com',
      demo: 'https://api.billing.io',
      analytics: 'https://mixpanel.com'
    },
    memo: 'Stripe webhook listener operational.\nCurrent MRR driven by this API: $3,200/mo.'
  }
];

const defaultBookmarks = [
  {
    id: 'cat_ai',
    title: 'AI Agents',
    icon: 'Bot',
    links: [
      { id: 'b_ai_1', name: 'Gemini', url: 'https://gemini.google.com' },
      { id: 'b_ai_2', name: 'DeepSeek', url: 'https://chat.deepseek.com' },
      { id: 'b_ai_3', name: 'ChatGPT', url: 'https://chatgpt.com' },
      { id: 'b_ai_4', name: 'Claude', url: 'https://claude.ai' }
    ]
  },
  {
    id: 'cat_media',
    title: 'Media',
    icon: 'MonitorPlay',
    links: [
      { id: 'b_md_1', name: 'YouTube', url: 'https://youtube.com' },
      { id: 'b_md_2', name: 'X / Twitter', url: 'https://x.com' },
      { id: 'b_md_3', name: 'Reddit', url: 'https://reddit.com' }
    ]
  },
  {
    id: 'cat_tech',
    title: 'Tech & Dev',
    icon: 'Code',
    links: [
      { id: 'b_tc_1', name: 'GitHub', url: 'https://github.com' },
      { id: 'b_tc_2', name: 'Vercel', url: 'https://vercel.com' },
      { id: 'b_tc_3', name: 'AWS', url: 'https://aws.amazon.com' },
      { id: 'b_tc_4', name: 'Stripe', url: 'https://dashboard.stripe.com' }
    ]
  },
  {
    id: 'cat_fav',
    title: 'Collections',
    icon: 'Star',
    links: [
      { id: 'b_fv_1', name: 'My Portfolio', url: 'https://my-website.com' },
      { id: 'b_fv_2', name: 'Notion', url: 'https://notion.so' }
    ]
  }
];

const searchEngines = [
  { id: 'google', name: 'Google', url: 'https://www.google.com/search?q=' },
  { id: 'bing', name: 'Bing', url: 'https://www.bing.com/search?q=' },
  { id: 'duck', name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
  { id: 'github', name: 'GitHub', url: 'https://github.com/search?q=' }
];

const availableGoogleApps = [
  { id: 'gmail', name: 'Gmail', icon: Mail, url: 'https://mail.google.com' },
  { id: 'gemini', name: 'Gemini', icon: Sparkles, url: 'https://gemini.google.com' },
  { id: 'drive', name: 'Drive', icon: HardDrive, url: 'https://drive.google.com' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, url: 'https://calendar.google.com' },
  { id: 'meet', name: 'Meet', icon: Video, url: 'https://meet.google.com' },
  { id: 'keep', name: 'Keep', icon: FileText, url: 'https://keep.google.com' }
];

const getIcon = (iconName) => {
  const icons = { Bot, MonitorPlay, Code, Star };
  const IconCmp = icons[iconName] || Globe;
  return <IconCmp size={14} />;
};

const DEFAULT_MEMO = '# Vision\n\n- Write goals here...';

const isDemoMode = () =>
  typeof window !== 'undefined' &&
  window.location.pathname.startsWith('/solohq/demo/');

const hasProjectNotes = (project) => {
  const memo = String((project && project.memo) || '').trim();
  return memo.length > 0 && memo !== DEFAULT_MEMO;
};

function useLocalStorage(key, initialValue) {
  const storage = isDemoMode() ? window.sessionStorage : window.localStorage;
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = storage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Local storage error:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      storage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Local storage error:", error);
    }
  }, [key, storedValue, storage]);

  return [storedValue, setStoredValue];
}

export default function SoloDashboard() {
  const [theme, setTheme] = useLocalStorage('solo_theme_v8', 'dark');
  const [language, setLanguage] = useLocalStorage('solo_language_v1', 'en');
  const [layoutOrder, setLayoutOrder] = useLocalStorage('solo_layout_v8', ['bookmarks', 'search', 'project_board', 'workspace']);

  useEffect(() => {
    if (layoutOrder.includes('stats') || layoutOrder.includes('chips')) {
      setLayoutOrder(['bookmarks', 'search', 'project_board', 'workspace']);
    }
  }, [layoutOrder, setLayoutOrder]);
  
  const [projects, setProjects] = useLocalStorage('solo_projects_v8', defaultProjects);
  const [bookmarksData, setBookmarksData] = useLocalStorage('solo_bookmarks_v8', defaultBookmarks);
  const [activeEngine, setActiveEngine] = useLocalStorage('solo_search_engine_v8', 'google');
  
  const [activeGoogleApps, setActiveGoogleApps] = useLocalStorage('solo_google_apps_v8', ['gmail', 'gemini', 'drive']);
  const [showAppsSetup, setShowAppsSetup] = useState(false);

  const [showStats, setShowStats] = useLocalStorage('solo_show_stats_v8', false);
  const [deletedProjectsCount, setDeletedProjectsCount] = useLocalStorage('solo_deleted_count_v8', 0);

  const [revenueConfig, setRevenueConfig] = useLocalStorage('solo_revenue_cfg_v8', {
    mode: 'manual', manualMrr: 4500, stripeApiKey: '', autoMrrValue: 0
  });

  const [cloudUser, setCloudUser] = useState(null);
  const [cloudStatus, setCloudStatus] = useState('local');
  const [cloudRevision, setCloudRevision] = useState(0);
  const [cloudWorkspace, setCloudWorkspace] = useState(null);
  const [cloudError, setCloudError] = useState('');
  const [showCloudSetup, setShowCloudSetup] = useState(false);
  const cloudTimerRef = useRef(null);
  const cloudSkipNextSyncRef = useRef(false);

  const [activeProjectId, setActiveProjectId] = useState(projects.length > 0 ? projects[0].id : null);
  const isNewProjectRef = useRef(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showStartupGuide, setShowStartupGuide] = useState(false);
  const [hasCopiedStartupUrl, setHasCopiedStartupUrl] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const tc = useCallback((key, variables = {}) => {
    const template = cloudTranslations[language]?.[key] || cloudTranslations.en[key] || key;
    return Object.entries(variables).reduce((value, [name, replacement]) => value.replace(`{${name}}`, replacement), template);
  }, [language]);
  
  const [isSyncingNotes, setIsSyncingNotes] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('In Sync');
  const [currentTime, setCurrentTime] = useState(new Date());

  const [draggedItem, setDraggedItem] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (isNewProjectRef.current) {
      isNewProjectRef.current = false;
    } else {
      setIsEditing(false);
    }
  }, [activeProjectId]);

  const themeStyles = {
    light: { bg: 'bg-[#f8fafc] text-slate-900', widget: 'bg-white shadow-sm border border-slate-200/80', header: 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-sm', input: 'bg-[#f1f5f9] border-slate-200 text-slate-900 focus:ring-blue-500/50', accent: 'bg-blue-600 text-white hover:bg-blue-700', accentText: 'text-blue-600', card: 'bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md', textMuted: 'text-slate-500', slider: 'accent-blue-600', chipActive: 'border-blue-500 ring-2 ring-blue-500/20 bg-blue-50/50', dragHandle: 'text-slate-300 hover:text-blue-500' },
    dark: { bg: 'bg-[#09090b] text-zinc-100', widget: 'bg-[#18181b] border border-zinc-800 shadow-xl', header: 'bg-[#09090b]/90 backdrop-blur-md border-b border-zinc-800', input: 'bg-[#09090b] border-zinc-800 text-zinc-100 focus:ring-emerald-500/50', accent: 'bg-emerald-600 text-white hover:bg-emerald-500', accentText: 'text-emerald-400', card: 'bg-[#18181b] border border-zinc-800 hover:border-emerald-500/50 hover:bg-[#27272a]', textMuted: 'text-zinc-400', slider: 'accent-emerald-500', chipActive: 'border-emerald-500 ring-2 ring-emerald-500/20 bg-[#18181b]', dragHandle: 'text-zinc-600 hover:text-emerald-500' },
    glass: { bg: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-950 to-slate-900 text-white', widget: 'bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl', header: 'bg-black/30 backdrop-blur-xl border-b border-white/10', input: 'bg-black/30 border-white/10 text-white placeholder-white/40 focus:ring-purple-500/50', accent: 'bg-purple-600 text-white hover:bg-purple-500 border border-purple-400/30', accentText: 'text-purple-300', card: 'bg-white/5 border border-white/10 hover:border-purple-400/60 hover:bg-white/10', textMuted: 'text-purple-200/60', slider: 'accent-purple-400', chipActive: 'border-purple-400 bg-white/10 shadow-[0_0_20px_rgba(168,85,247,0.2)]', dragHandle: 'text-white/20 hover:text-purple-400' },
    hacker: { bg: 'bg-black text-green-500 font-mono', widget: 'bg-black border border-green-900 shadow-[0_0_15px_rgba(0,255,0,0.05)]', header: 'bg-black border-b border-green-900', input: 'bg-black border-green-900 text-green-400 focus:ring-green-500/50 focus:border-green-500', accent: 'bg-green-950 text-green-400 hover:bg-green-900 border border-green-500', accentText: 'text-green-400', card: 'bg-black border border-green-900 hover:border-green-500', textMuted: 'text-green-700', slider: 'accent-green-500', chipActive: 'border-green-400 bg-green-950/30 shadow-[0_0_15px_rgba(0,255,0,0.3)]', dragHandle: 'text-green-900 hover:text-green-400' }
  };

  const currentTheme = themeStyles[theme] || themeStyles.dark;
  const sortedProjects = [...projects].sort((a, b) => b.lastUpdated - a.lastUpdated);
  const activeProject = projects.find(p => p.id === activeProjectId) || null;
  const deletedProjectsTotal = Number(deletedProjectsCount) || 0;

  const stats = {
    total: projects.length,
    developing: projects.filter(p => p.status === 'developing').length,
    launched: projects.filter(p => p.status === 'launched').length,
    revenue: projects.filter(p => p.status === 'revenue').length,
    abandoned: projects.filter(p => p.status === 'abandoned').length + deletedProjectsTotal,
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'developing': return 'text-blue-500';
      case 'launched': return 'text-emerald-500';
      case 'revenue': return 'text-amber-500';
      case 'abandoned': return 'text-zinc-500';
      default: return 'text-blue-500';
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'developing': return 'Developing';
      case 'launched': return 'Launched';
      case 'revenue': return 'Revenue Gen';
      case 'abandoned': return 'Abandoned';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'developing': return <Code size={14} />;
      case 'launched': return <Rocket size={14} />;
      case 'revenue': return <DollarSign size={14} />;
      case 'abandoned': return <AlertCircle size={14} />;
      default: return <Target size={14} />;
    }
  };

  const updateProject = (id, updates) => {
    setProjects(projects.map(p => p.id === id ? { ...p, ...updates, lastUpdated: Date.now() } : p));
  };

  const handleDeleteProject = () => {
    if (!activeProject) return;
    const remainingProjects = projects.filter(p => p.id !== activeProject.id);
    setProjects(remainingProjects);
    if (hasProjectNotes(activeProject)) {
      setDeletedProjectsCount(prev => (Number(prev) || 0) + 1);
    }
    setIsDeleteConfirmOpen(false);
    setIsEditing(false);
    setActiveProjectId(remainingProjects.length > 0 ? remainingProjects[0].id : null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const engine = searchEngines.find(eng => eng.id === activeEngine) || searchEngines[0];
    window.open(`${engine.url}${encodeURIComponent(searchQuery)}`, '_blank');
  };

  const workspaceSnapshot = useCallback(() => ({
    projects,
    bookmarks: bookmarksData,
    theme,
    layoutOrder,
    activeEngine,
    activeGoogleApps,
    showStats,
    deletedProjectsCount,
    revenueConfig,
    language
  }), [projects, bookmarksData, theme, layoutOrder, activeEngine, activeGoogleApps, showStats, deletedProjectsCount, revenueConfig, language]);

  const applyWorkspaceSnapshot = (data) => {
    if (!data || typeof data !== 'object') return;
    cloudSkipNextSyncRef.current = true;
    if (Array.isArray(data.projects)) setProjects(data.projects);
    if (Array.isArray(data.bookmarks)) setBookmarksData(data.bookmarks);
    if (typeof data.theme === 'string') setTheme(data.theme);
    if (Array.isArray(data.layoutOrder)) setLayoutOrder(data.layoutOrder);
    if (typeof data.activeEngine === 'string') setActiveEngine(data.activeEngine);
    if (Array.isArray(data.activeGoogleApps)) setActiveGoogleApps(data.activeGoogleApps);
    if (typeof data.showStats === 'boolean') setShowStats(data.showStats);
    if (typeof data.deletedProjectsCount === 'number') setDeletedProjectsCount(data.deletedProjectsCount);
    if (data.revenueConfig && typeof data.revenueConfig === 'object') setRevenueConfig(data.revenueConfig);
    if (typeof data.language === 'string' && cloudTranslations[data.language]) setLanguage(data.language);
  };

  const loadCloudWorkspace = useCallback(async () => {
    if (!cloudUser) return;
    setCloudError('');
    try {
      const response = await fetch('/api/solohq/sync', { credentials: 'same-origin' });
      const result = await response.json();
      if (!response.ok || !result.ok) throw new Error(result.error || 'sync_unavailable');
      setCloudWorkspace(result.workspace);
      setCloudRevision(Number(result.workspace?.revision || 0));
      setCloudStatus(result.workspace ? 'needs-choice' : 'ready');
    } catch {
      setCloudStatus('error');
      setCloudError(tc('unavailable'));
    }
  }, [cloudUser, tc]);

  const uploadWorkspace = useCallback(async (force = false) => {
    if (!cloudUser) return;
    setCloudStatus('syncing');
    setCloudError('');
    try {
      const response = await fetch('/api/solohq/sync', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: workspaceSnapshot(), revision: cloudRevision, force })
      });
      const result = await response.json();
      if (response.status === 409) {
        await loadCloudWorkspace();
        return;
      }
      if (!response.ok || !result.ok) throw new Error(result.error || 'sync_failed');
      cloudSkipNextSyncRef.current = true;
      setCloudRevision(Number(result.revision || cloudRevision));
      setCloudWorkspace(null);
      setCloudStatus('synced');
      setShowCloudSetup(false);
    } catch {
      setCloudStatus('error');
      setCloudError(tc('saveFailed'));
    }
  }, [cloudUser, cloudRevision, loadCloudWorkspace, workspaceSnapshot, tc]);

  const downloadCloudWorkspace = () => {
    if (!cloudWorkspace?.data) return;
    applyWorkspaceSnapshot(cloudWorkspace.data);
    setCloudRevision(Number(cloudWorkspace.revision || 0));
    setCloudWorkspace(null);
    setCloudStatus('synced');
    setShowCloudSetup(false);
  };

  const startGoogleLogin = () => {
    window.location.assign('/api/solohq/auth/google');
  };

  const deleteCloudWorkspace = async () => {
    if (!window.confirm(tc('deleteConfirm'))) return;
    try {
      const response = await fetch('/api/solohq/sync', { method: 'DELETE', credentials: 'same-origin' });
      if (!response.ok) throw new Error('delete_failed');
      setCloudWorkspace(null);
      setCloudRevision(0);
      setCloudStatus('ready');
    } catch {
      setCloudError(tc('deleteFailed'));
    }
  };

  const disconnectCloud = () => {
    window.location.assign('/api/solohq/auth/logout');
  };

  const copyStartupUrl = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = url;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      textarea.remove();
    }
    setHasCopiedStartupUrl(true);
    window.setTimeout(() => setHasCopiedStartupUrl(false), 2500);
  };

  useEffect(() => {
    if (isDemoMode()) return undefined;
    let active = true;
    fetch('/api/solohq/session', { credentials: 'same-origin' })
      .then((response) => response.ok ? response.json() : null)
      .then((result) => {
        if (!active || !result?.user) return;
        setCloudUser(result.user);
        setCloudStatus('checking');
      })
      .catch(() => {});
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!cloudUser) return;
    loadCloudWorkspace();
  }, [cloudUser, loadCloudWorkspace]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('sync') === 'choose') setShowCloudSetup(true);
  }, [cloudUser]);

  useEffect(() => {
    if (cloudStatus !== 'synced' || isDemoMode()) return undefined;
    if (cloudSkipNextSyncRef.current) {
      cloudSkipNextSyncRef.current = false;
      return undefined;
    }
    window.clearTimeout(cloudTimerRef.current);
    cloudTimerRef.current = window.setTimeout(() => uploadWorkspace(), 900);
    return () => window.clearTimeout(cloudTimerRef.current);
  }, [projects, bookmarksData, theme, layoutOrder, activeEngine, activeGoogleApps, showStats, deletedProjectsCount, revenueConfig, cloudStatus, uploadWorkspace]);

  const handleDragStart = (e, id) => {
    setDraggedItem(id);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => { if(e.target) e.target.style.opacity = '0.5'; }, 0);
  };

  const handleDragEnd = (e) => {
      setDraggedItem(null);
      if(e.target) e.target.style.opacity = '1';
  }

  const handleDragOver = (e, id) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === id) return;
    const newOrder = [...layoutOrder];
    const draggedIndex = newOrder.indexOf(draggedItem);
    const targetIndex = newOrder.indexOf(id);
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedItem);
    setLayoutOrder(newOrder);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDraggedItem(null);
  };

  const syncToNotebookLM = () => {
    if (!activeProject) return;
    setIsSyncingNotes(true);
    setSyncStatusText('Exporting...');
    setTimeout(() => {
      const content = `Project: ${activeProject.name}\nStatus: ${activeProject.status}\n\n=== MEMO ===\n${activeProject.memo}`;
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeProject.name.replace(/\s+/g, '_')}_memo.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsSyncingNotes(false);
      setSyncStatusText('NotebookLM Ready');
      setTimeout(() => setSyncStatusText('In Sync'), 3000);
      window.open('https://notebooklm.google.com/', '_blank');
    }, 800);
  };

  // 导出 JSON 数据
  const handleExportJSON = () => {
    const exportData = {
      projects: projects,
      bookmarks: bookmarksData,
      deletedProjectsCount: deletedProjectsTotal,
      timestamp: new Date().toISOString(),
      version: "1.0"
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `solohq_backup_${dateStr}.json`);
    
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  // 导入 JSON 数据
  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.projects && Array.isArray(importedData.projects)) {
          setProjects(importedData.projects);
          if (importedData.projects.length > 0) {
            setActiveProjectId(importedData.projects[0].id);
          }
        }
        if (importedData.bookmarks && Array.isArray(importedData.bookmarks)) {
          setBookmarksData(importedData.bookmarks);
        }
        if (typeof importedData.deletedProjectsCount === 'number') {
          setDeletedProjectsCount(importedData.deletedProjectsCount);
        }
        alert("Data imported successfully! 数据导入成功！");
      } catch {
        alert("Invalid JSON file! 无效的备份文件！");
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const renderBookmarks = () => (
    <div className={`p-4 rounded-xl ${currentTheme.widget} relative group transition-all`}>
      <div draggable onDragStart={(e) => handleDragStart(e, 'bookmarks')} onDragEnd={handleDragEnd} className={`absolute top-3 left-2 cursor-grab active:cursor-grabbing p-1 ${currentTheme.dragHandle}`} title="Drag to reorder">
        <GripHorizontal size={14} />
      </div>
      <div className="absolute top-3 right-3 hidden sm:block">
        <div className={`opacity-30 hover:opacity-100 transition-opacity text-[10px] uppercase font-bold flex items-center gap-1 cursor-help ${currentTheme.textMuted}`} title="Syncs natively when installed as Chrome Extension">
           <Star size={10} /> Syncs with System
        </div>
      </div>
      <div className="pl-6 flex flex-col gap-2 sm:mt-1">
        {bookmarksData.map(category => (
          <div key={category.id} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <div className={`w-28 flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${currentTheme.textMuted}`}>
              {getIcon(category.icon)} {category.title}
            </div>
            <div className="flex-1 flex flex-wrap gap-1.5 items-center">
              {category.links.map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noreferrer" className={`group flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border border-transparent ${theme === 'glass' ? 'bg-white/5 hover:bg-white/15 hover:border-white/20' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 hover:border-current/10 shadow-sm'}`}>
                  <span className="truncate max-w-[150px]">{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSearch = () => (
    <div className={`p-4 rounded-xl flex flex-col md:flex-row justify-center items-center relative group ${currentTheme.widget} gap-4`}>
      <div draggable onDragStart={(e) => handleDragStart(e, 'search')} onDragEnd={handleDragEnd} className={`absolute top-1/2 -translate-y-1/2 left-2 cursor-grab active:cursor-grabbing p-1 hidden md:block ${currentTheme.dragHandle}`}>
        <GripHorizontal size={14} />
      </div>
      <form onSubmit={handleSearch} className="w-full md:w-auto md:flex-1 max-w-3xl flex items-center gap-2 pl-0 md:pl-8">
        <div className="relative flex-shrink-0">
          <select value={activeEngine} onChange={(e) => setActiveEngine(e.target.value)} className={`appearance-none pl-3 pr-8 py-3 rounded-lg text-sm font-bold border outline-none cursor-pointer ${currentTheme.input} bg-transparent`}>
            {searchEngines.map(eng => <option key={eng.id} value={eng.id} className="bg-black text-white">{eng.name}</option>)}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
        </div>
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={`Search with ${searchEngines.find(e => e.id === activeEngine)?.name}...`} className={`w-full pl-10 pr-4 py-3 rounded-lg text-sm outline-none border transition-colors ${currentTheme.input}`} />
        </div>
      </form>
      <div className="flex items-center gap-2 pr-2">
        <div className="h-6 w-px bg-current opacity-10 mx-2 hidden md:block"></div>
        {availableGoogleApps.filter(app => activeGoogleApps.includes(app.id)).map(app => (
          <a key={app.id} href={app.url} target="_blank" rel="noreferrer" title={app.name} className={`p-2 rounded-full transition-all border border-transparent ${theme === 'glass' ? 'hover:bg-white/10' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>
            <app.icon size={18} className="opacity-80 hover:opacity-100" />
          </a>
        ))}
        <div className="relative">
          <button onClick={() => setShowAppsSetup(!showAppsSetup)} className={`p-2 rounded-full transition-all border border-dashed opacity-50 hover:opacity-100 ${theme === 'glass' ? 'border-white/40' : 'border-current/40'}`}>
            <Settings2 size={16} />
          </button>
          {showAppsSetup && (
            <div className={`absolute top-full right-0 mt-2 w-48 p-3 rounded-xl z-50 shadow-2xl border ${theme === 'glass' ? 'bg-slate-900/90 backdrop-blur-xl border-white/20' : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800'}`}>
              <h4 className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${theme === 'glass' ? 'text-white/50' : 'text-zinc-500'}`}>Quick Apps</h4>
              <div className="space-y-1">
                {availableGoogleApps.map(app => (
                  <label key={app.id} className="flex items-center gap-2 text-xs p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer">
                    <input type="checkbox" checked={activeGoogleApps.includes(app.id)} onChange={(e) => {
                        if (e.target.checked) setActiveGoogleApps([...activeGoogleApps, app.id]);
                        else setActiveGoogleApps(activeGoogleApps.filter(id => id !== app.id));
                      }} className="rounded border-gray-400" />
                    <app.icon size={12} className="opacity-70" /> <span>{app.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProjectBoard = () => (
    <div className={`rounded-xl relative group flex overflow-hidden transition-all duration-500 border shadow-sm ${currentTheme.widget}`}>
       <div draggable onDragStart={(e) => handleDragStart(e, 'project_board')} onDragEnd={handleDragEnd} className={`absolute top-2 left-2 cursor-grab active:cursor-grabbing p-1 hidden lg:block z-10 ${currentTheme.dragHandle}`}>
          <GripHorizontal size={14} />
        </div>
        <div className={`w-14 sm:w-16 flex-shrink-0 flex flex-col items-center justify-center border-r border-current/10 bg-black/5 dark:bg-white/5 z-10 py-4 gap-4`}>
           <button onClick={() => setShowStats(!showStats)} className={`p-2 rounded-full transition-all ${showStats ? currentTheme.accent : 'bg-transparent hover:bg-black/10 dark:hover:bg-white/10'}`} title={showStats ? "Hide Stats" : "Show Stats"}>
             {showStats ? <EyeOff size={18} /> : <Eye size={18} />}
           </button>
           <div className="[writing-mode:vertical-lr] text-[10px] uppercase font-bold tracking-widest opacity-40">
             {showStats ? 'DATA' : 'PROJ'}
           </div>
        </div>
        <div className="flex-1 relative overflow-hidden flex items-center min-h-[80px]">
          <div className={`absolute inset-0 flex items-center transition-all duration-500 ease-in-out p-4 gap-6 overflow-x-auto scrollbar-hide ${showStats ? 'opacity-100 translate-y-0 relative' : 'opacity-0 translate-y-8 pointer-events-none absolute'}`}>
              <div className="flex flex-col justify-center pr-6 border-r border-current/10 flex-shrink-0">
                <div className="flex items-center gap-1 mb-1">
                  <span className={`text-[10px] uppercase tracking-wider font-bold ${currentTheme.textMuted}`}>Global MRR</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className={`text-xl font-bold ${currentTheme.accentText}`}>$</span>
                  <input type="number" value={revenueConfig.manualMrr} onChange={(e) => setRevenueConfig({ ...revenueConfig, manualMrr: parseInt(e.target.value) || 0 })} className="text-3xl font-black bg-transparent w-24 outline-none p-0 border-none focus:ring-0" />
                </div>
              </div>
              <div className="flex flex-col justify-center flex-shrink-0">
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 ${currentTheme.textMuted}`}>Total</span>
                <span className="text-2xl font-black">{stats.total}</span>
              </div>
              <div className="flex flex-col justify-center flex-shrink-0">
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 text-emerald-500`}>Launched</span>
                <span className="text-2xl font-black">{stats.launched}</span>
              </div>
              <div className="flex flex-col justify-center flex-shrink-0">
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 text-amber-500`}>Revenue</span>
                <span className="text-2xl font-black">{stats.revenue}</span>
              </div>
              <div className="flex flex-col justify-center flex-shrink-0">
                <span className={`text-[10px] uppercase tracking-wider font-bold mb-1 text-zinc-500`}>Abandoned</span>
                <span className="text-2xl font-black">{stats.abandoned}</span>
              </div>
          </div>
          <div className={`absolute inset-0 flex items-center gap-3 px-4 py-2 overflow-x-auto scrollbar-hide transition-all duration-500 ease-in-out ${!showStats ? 'opacity-100 translate-y-0 relative' : 'opacity-0 -translate-y-8 pointer-events-none absolute'}`}>
              {sortedProjects.map(project => (
                <div key={project.id} onClick={() => setActiveProjectId(project.id)} className={`flex-shrink-0 w-[200px] p-3 rounded-lg cursor-pointer transition-all duration-200 border ${currentTheme.card} ${activeProjectId === project.id ? currentTheme.chipActive : 'opacity-70 hover:opacity-100 scale-95 hover:scale-100'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className="font-extrabold text-sm max-w-[140px] truncate block" title={project.name}>{project.name}</span>
                    <span className={getStatusColor(project.status)}>{getStatusIcon(project.status)}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2 mb-1">
                     <span className={`text-[10px] font-bold uppercase tracking-wider ${getStatusColor(project.status)}`}>{getStatusLabel(project.status)}</span>
                     <span className={`text-[10px] font-bold opacity-60`}>{project.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full bg-current ${getStatusColor(project.status)}`} style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              ))}
              <button aria-label="Create project" onClick={() => {
                  const newId = Date.now().toString();
                  setProjects([{
                    id: newId, name: 'New Project', progress: 0, status: 'developing', hours: 0, lastUpdated: Date.now(),
                    links: { github: '', knowledge: '', deploy: '', demo: '', analytics: '' },
                    memo: DEFAULT_MEMO
                  }, ...projects]);
                  isNewProjectRef.current = true;
                  setActiveProjectId(newId);
                  setIsEditing(true);
                }} className={`flex-shrink-0 w-12 h-[68px] flex flex-col items-center justify-center rounded-lg border border-dashed transition-all opacity-50 hover:opacity-100 ${theme === 'glass' ? 'border-white/30 hover:bg-white/10' : 'border-current'}`}>
                <Plus size={16} />
              </button>
          </div>
        </div>
    </div>
  );

  const renderWorkspace = () => {
    if (!activeProject) return (
      <div className={`flex-1 flex flex-col items-center justify-center rounded-xl border border-dashed opacity-50 min-h-[400px] ${theme === 'glass' ? 'border-white/30' : 'border-current'}`}>
        <Target size={32} className="mb-2" />
        <p className="text-sm font-bold">Select or Create a Project</p>
      </div>
    );
    return (
      <main className="flex-1 flex flex-col lg:flex-row gap-4 sm:gap-6 relative group min-h-0">
        <div draggable onDragStart={(e) => handleDragStart(e, 'workspace')} onDragEnd={handleDragEnd} className={`absolute -top-3 -left-6 cursor-grab active:cursor-grabbing p-1 hidden lg:block ${currentTheme.dragHandle}`}>
          <GripHorizontal size={14} />
        </div>
        <div className={`flex-1 flex flex-col rounded-xl overflow-hidden min-h-[400px] shadow-sm border ${currentTheme.widget}`}>
            <div className={`p-3 px-4 border-b border-current/10 flex justify-between items-center bg-black/5 dark:bg-white/5`}>
              <div className="flex items-center gap-2">
                <FileText size={16} className={currentTheme.accentText} />
                <span className="font-bold text-sm truncate">{activeProject.name} <span className="opacity-40 font-normal">| Workspace Memo</span></span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold flex items-center gap-1 ${isSyncingNotes ? 'text-blue-400 animate-pulse' : 'opacity-50'}`}>
                  {isSyncingNotes ? <RefreshCw size={10} className="animate-spin" /> : <Check size={10} />} {syncStatusText}
                </span>
                <button onClick={syncToNotebookLM} className={`flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-bold border transition-colors border-current/20 hover:bg-black/5 dark:hover:bg-white/10`} title="Export to NotebookLM Format">
                  <Download size={12} /> Sync
                </button>
              </div>
            </div>
            <textarea value={activeProject.memo} onChange={(e) => updateProject(activeProject.id, { memo: e.target.value })} placeholder="Daily dev log, milestones, ideas..." className={`w-full flex-1 p-5 outline-none bg-transparent leading-relaxed text-sm transition-colors resize-none ${theme === 'hacker' ? 'text-green-400 font-mono' : 'font-sans'}`} />
        </div>
        <div className={`w-full lg:w-80 flex flex-col rounded-xl overflow-hidden flex-shrink-0 shadow-sm border ${currentTheme.widget}`}>
            <div className={`p-3 px-4 border-b border-current/10 flex justify-between items-center bg-black/5 dark:bg-white/5`}>
              <h2 className="font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 opacity-70">
                {isEditing ? <Edit3 size={14} /> : <Target size={14} />} {isEditing ? 'Configure' : 'Overview'}
              </h2>
              <div className="flex items-center gap-2">
                {isEditing && (
                  <button aria-label="Delete project" title="Delete project" onClick={() => setIsDeleteConfirmOpen(true)} className="p-2 rounded text-red-400 hover:bg-red-500/10 transition-colors">
                    <Trash2 size={14} />
                  </button>
                )}
                <button onClick={() => setIsEditing(!isEditing)} className={`px-3 py-1 rounded text-[10px] font-bold border transition-all flex items-center gap-1 ${isEditing ? 'bg-emerald-500 text-white border-emerald-500 shadow-md' : `border-current/20 ${currentTheme.accentText} hover:bg-black/5 dark:hover:bg-white/10`}`}>
                  {isEditing ? <><Save size={12}/> Save</> : <><Edit3 size={12}/> Edit</>}
                </button>
              </div>
            </div>
            <div className="p-5 space-y-6 overflow-y-auto scrollbar-hide flex-1">
              <div>
                {isEditing ? (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase opacity-50 mb-1">Project Name</label>
                      <input value={activeProject.name} onChange={(e) => updateProject(activeProject.id, { name: e.target.value })} className={`text-sm font-bold w-full p-2.5 rounded-lg border ${currentTheme.input}`} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase opacity-50 mb-1">Milestone</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['developing', 'launched', 'revenue', 'abandoned'].map(s => (
                          <button key={s} onClick={() => updateProject(activeProject.id, { status: s })} className={`py-2 rounded-lg text-[10px] font-bold flex items-center justify-center gap-1.5 border transition-all ${activeProject.status === s ? `border-current ${getStatusColor(s)} bg-black/10 dark:bg-white/10 shadow-sm` : 'border-transparent opacity-50 bg-black/5 dark:bg-white/5 hover:opacity-100'}`}>
                            {getStatusIcon(s)} <span className="capitalize">{s}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-2xl font-black mb-2 leading-tight break-words">{activeProject.name}</h3>
                    <div className="flex items-center gap-2">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/5 dark:bg-white/10 border border-current/10 ${getStatusColor(activeProject.status)}`}>
                        {getStatusIcon(activeProject.status)} <span className="capitalize">{activeProject.status}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-2 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-current/5">
                <div className="flex justify-between items-end">
                  <span className={`text-[10px] uppercase font-bold opacity-60 flex items-center gap-1`}><Activity size={12}/> Completion</span>
                  <span className={`text-sm font-black ${getStatusColor(activeProject.status)}`}>{activeProject.progress}%</span>
                </div>
                {isEditing ? (
                  <input type="range" min="0" max="100" value={activeProject.progress} onChange={(e) => updateProject(activeProject.id, { progress: parseInt(e.target.value) })} className={`w-full h-2 rounded-lg appearance-none cursor-pointer bg-black/10 dark:bg-white/20 ${currentTheme.slider}`} />
                ) : (
                  <div className="w-full h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div className={`h-full rounded-full transition-all duration-500 ease-out bg-current ${getStatusColor(activeProject.status)}`} style={{ width: `${activeProject.progress}%` }}></div>
                  </div>
                )}
              </div>
              <div>
                <h4 className={`text-[10px] uppercase font-bold mb-3 opacity-50 flex items-center gap-1`}><Zap size={12}/> Integrations</h4>
                <div className="space-y-2">
                  {[
                    { key: 'github', label: 'Source Code', icon: GitBranch },
                    { key: 'deploy', label: 'Live Server', icon: Cloud },
                    { key: 'demo', label: 'Public Demo', icon: PlayCircle },
                    { key: 'analytics', label: 'Data Panel', icon: BarChart2 }
                  ].map(field => {
                    const hasLink = !!activeProject.links[field.key];
                    if (!isEditing && !hasLink) return null;
                    return (
                      <div key={field.key} className={`flex items-center gap-3 ${!isEditing ? 'p-2 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 transition-colors border border-current/5 hover:border-current/20' : ''}`}>
                        <div className={`p-1.5 rounded-md ${hasLink ? 'bg-black/10 dark:bg-white/10' : 'opacity-30'}`}>
                          <field.icon size={14} className={hasLink ? currentTheme.accentText : ''} />
                        </div>
                        {isEditing ? (
                          <input value={activeProject.links[field.key]} onChange={(e) => updateProject(activeProject.id, { links: { ...activeProject.links, [field.key]: e.target.value } })} placeholder={`${field.label} URL...`} className={`flex-1 px-3 py-1.5 text-xs rounded-md border ${currentTheme.input}`} />
                        ) : (
                          <a href={activeProject.links[field.key]} target="_blank" rel="noreferrer" className="flex-1 flex justify-between items-center text-xs font-bold group">
                            <span>{field.label}</span> <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        )}
                      </div>
                    );
                  })}
                  {!isEditing && Object.values(activeProject.links).every(l => !l) && (
                    <div className="text-[10px] opacity-40 text-center py-2 italic border border-dashed rounded-lg border-current/20">No links configured.</div>
                  )}
                </div>
              </div>
            </div>
        </div>
      </main>
    );
  };

  const widgetMap = { bookmarks: renderBookmarks, search: renderSearch, project_board: renderProjectBoard, workspace: renderWorkspace };

  return (
    <div className={`min-h-screen transition-colors duration-500 flex flex-col font-sans ${currentTheme.bg}`}>
      {isDemoMode() && (
        <div className="w-full px-4 py-2 text-center text-xs font-bold bg-amber-500/10 border-b border-amber-500/25 text-amber-400">
          Demo data resets when you close this window. Use it for testing only.{" "}
          <a href="https://github.com/zhaolongfei-shareye/SoloHQ" target="_blank" rel="noreferrer" className="underline">Download SoloHQ</a>{" "}
          to keep your data locally.
        </div>
      )}
      <nav className={`sticky top-0 z-40 px-6 py-3 flex items-center justify-between ${currentTheme.header}`}>
        <div className="flex items-center gap-3">
          <Target className={currentTheme.accentText} size={20} />
          <span className="font-extrabold text-sm tracking-tight hidden sm:block uppercase">SOLO<span className="opacity-50">HQ</span></span>
        </div>
        <div className="flex items-center justify-end gap-5">
          <div className={`text-xs font-mono hidden lg:flex items-center gap-2 font-bold ${currentTheme.textMuted}`}>
            <Clock size={12} className="opacity-50" />
            {currentTime.toLocaleTimeString('en-US', { hour12: false })}
          </div>
          <button onClick={() => setShowStartupGuide(true)} className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold border border-current/15 transition-colors hover:bg-black/5 dark:hover:bg-white/10 ${currentTheme.textMuted}`}>
            <Globe size={13} /> Set as startup page
          </button>
          <button aria-label="Open settings" onClick={() => setIsSettingsOpen(true)} className={`p-1.5 rounded-full transition-transform hover:rotate-90 ${theme === 'glass' ? 'bg-white/10 hover:bg-white/20' : 'bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20'}`}>
            <Settings size={16} />
          </button>
        </div>
      </nav>

      <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 flex-1 flex flex-col gap-4 sm:gap-6 overflow-hidden">
        {layoutOrder.map((widgetKey) => {
          const isFlex1 = widgetKey === 'workspace'; 
          if (!widgetMap[widgetKey]) return null;
          return (
            <div key={widgetKey} onDragOver={(e) => handleDragOver(e, widgetKey)} onDrop={handleDrop} className={`transition-all duration-300 ease-in-out ${isFlex1 ? 'flex-1 flex flex-col min-h-0' : 'flex-none'} ${draggedItem === widgetKey ? 'opacity-30 scale-95' : 'opacity-100 scale-100'}`}>
              {widgetMap[widgetKey]()}
            </div>
          );
        })}
      </div>

      {isDeleteConfirmOpen && activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className={`w-full max-w-sm rounded-2xl p-6 shadow-2xl border ${currentTheme.widget}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black flex items-center gap-2"><Trash2 size={20} className="text-red-500" /> Delete Project</h3>
              <button aria-label="Close delete dialog" onClick={() => setIsDeleteConfirmOpen(false)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><XCircle size={18} /></button>
            </div>
            <p className="text-sm opacity-70 mb-6">Delete "{activeProject.name}"? {hasProjectNotes(activeProject) ? 'This project will be counted as abandoned.' : 'This project has no notes and will not affect the abandoned count.'}</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="px-4 py-2 rounded-lg text-xs font-bold border border-current/20 hover:bg-black/5 dark:hover:bg-white/10">Cancel</button>
              <button onClick={handleDeleteProject} className="px-4 py-2 rounded-lg text-xs font-bold bg-red-600 text-white hover:bg-red-500">Delete</button>
            </div>
          </div>
        </div>
      )}

      {showStartupGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border ${currentTheme.widget}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black flex items-center gap-2"><Globe size={20} className={currentTheme.accentText} /> Set SoloHQ as your startup page</h3>
              <button aria-label="Close startup page guide" onClick={() => setShowStartupGuide(false)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><XCircle size={18} /></button>
            </div>
            <p className="text-sm opacity-70 leading-relaxed mb-5">This takes one minute and does not install anything. Chrome and Edge will open SoloHQ whenever you start the browser.</p>
            <ol className="space-y-3 text-sm list-decimal list-inside opacity-85">
              <li>Copy the SoloHQ link below.</li>
              <li>Open browser <strong>Settings</strong> and find <strong>On startup</strong>.</li>
              <li>Choose <strong>Open a specific page or pages</strong>, then paste the link.</li>
            </ol>
            <div className={`mt-5 p-3 rounded-xl border border-current/10 bg-black/5 dark:bg-white/5 flex items-center gap-3`}>
              <code className="min-w-0 flex-1 truncate text-xs opacity-70">{window.location.href}</code>
              <button onClick={copyStartupUrl} className={`shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold ${currentTheme.accent}`}>
                {hasCopiedStartupUrl ? <Check size={14} /> : <Copy size={14} />}
                {hasCopiedStartupUrl ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <p className="mt-4 text-xs opacity-50">New tabs remain controlled by your browser. This setting only changes the page opened when the browser starts.</p>
          </div>
        </div>
      )}

      {showCloudSetup && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl border ${currentTheme.widget}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black flex items-center gap-2"><Cloud size={20} className={currentTheme.accentText} /> {tc('cloudTitle')}</h3>
              <button aria-label="Close cloud sync" onClick={() => setShowCloudSetup(false)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><XCircle size={18} /></button>
            </div>
            {!cloudUser ? (
              <>
                <p className="text-sm opacity-70 leading-relaxed">{tc('intro')}</p>
                <button onClick={startGoogleLogin} className={`mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold ${currentTheme.accent}`}><Cloud size={16} /> {tc('continue')}</button>
              </>
            ) : cloudStatus === 'needs-choice' ? (
              <>
                <p className="text-sm opacity-70 leading-relaxed">{tc('found', { email: cloudUser.email })}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  <button onClick={downloadCloudWorkspace} className="p-4 text-left rounded-xl border border-current/15 hover:bg-black/5 dark:hover:bg-white/10"><Download size={16} className="mb-2" /><strong className="block text-sm">{tc('useCloud')}</strong><span className="text-xs opacity-60">{tc('useCloudHelp')}</span></button>
                  <button onClick={() => uploadWorkspace(true)} className={`p-4 text-left rounded-xl ${currentTheme.accent}`}><Upload size={16} className="mb-2" /><strong className="block text-sm">{tc('useDevice')}</strong><span className="text-xs opacity-75">{tc('useDeviceHelp')}</span></button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm opacity-70 leading-relaxed">{tc('signedIn', { email: cloudUser.email })}</p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => uploadWorkspace()} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold ${currentTheme.accent}`}><RefreshCw size={15} /> {tc('syncNow')}</button>
                  <button onClick={() => setShowCloudSetup(false)} className="px-4 py-3 rounded-lg text-sm font-bold border border-current/15">{tc('done')}</button>
                </div>
              </>
            )}
            {cloudError && <p className="mt-4 text-xs text-red-400">{cloudError}</p>}
          </div>
        </div>
      )}

      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className={`w-full max-w-2xl rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-hide border ${currentTheme.widget}`}>
            <div className="flex justify-between items-center mb-6 border-b border-current/10 pb-4">
              <h2 className="text-xl font-black flex items-center gap-2"><Settings className={currentTheme.accentText} size={24} /> {tc('settings')}</h2>
              <button onClick={() => setIsSettingsOpen(false)} className="p-2 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"><XCircle size={20} /></button>
            </div>
            <div className="space-y-8">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase mb-3 opacity-60"><LayoutDashboard size={14}/> Interface Theme</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[{ id: 'light', label: 'Minimal Light' }, { id: 'dark', label: 'Midnight Dark' }, { id: 'glass', label: 'Aura Glass' }, { id: 'hacker', label: 'Cyber Hacker' }].map(thm => (
                    <button key={thm.id} onClick={() => setTheme(thm.id)} className={`py-3 px-2 rounded-xl border text-xs font-bold transition-all ${theme === thm.id ? `border-current ${currentTheme.accentText} bg-black/5 dark:bg-white/10 shadow-inner` : 'border-current/10 opacity-60 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'}`}>{thm.label}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase mb-3 opacity-60"><Globe size={14}/> {tc('language')}</label>
                <select value={language} onChange={(event) => setLanguage(event.target.value)} className={`w-full rounded-lg border px-3 py-2 text-sm ${currentTheme.input}`}>
                  {languageOptions.map(([code, label]) => <option key={code} value={code}>{label}</option>)}
                </select>
                <p className="mt-2 text-[10px] opacity-60">{tc('languageHelp')}</p>
              </div>
              {!isDemoMode() && (
                <div className={`p-4 rounded-xl border border-current/10 bg-black/5 dark:bg-white/5`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xs font-bold uppercase mb-1 flex items-center gap-2 opacity-80"><Cloud size={14} className="text-emerald-500"/> {tc('cloudTitle')}</h3>
                      <p className="text-[10px] opacity-60 leading-relaxed">{cloudUser ? tc('summary', { email: cloudUser.email, state: cloudStatus === 'synced' ? tc('inSync') : tc('choose') }) : tc('optional')}</p>
                    </div>
                    <button onClick={() => setShowCloudSetup(true)} className={`shrink-0 px-3 py-2 rounded text-xs font-bold ${currentTheme.accent}`}>{cloudUser ? tc('manage') : tc('signIn')}</button>
                  </div>
                  {cloudUser && <div className="mt-3 flex gap-3 text-[10px] font-bold"><button onClick={deleteCloudWorkspace} className="opacity-60 hover:opacity-100">{tc('delete')}</button><button onClick={disconnectCloud} className="opacity-60 hover:opacity-100">{tc('signOut')}</button></div>}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-4 rounded-xl border border-current/10 bg-black/5 dark:bg-white/5`}>
                   <h3 className="text-xs font-bold uppercase mb-3 flex items-center gap-2 opacity-80"><Database size={14} className="text-blue-500"/> Data Backup</h3>
                   <div className="space-y-3">
                      <p className="text-[10px] opacity-60 leading-relaxed">Your data is stored locally. Export a JSON backup to move between browsers.</p>
                      <div className="flex gap-2">
                        <button onClick={handleExportJSON} className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"><Download size={12}/> Export JSON</button>
                        <label className="flex-1 flex items-center justify-center gap-1 text-xs py-2 rounded bg-zinc-800 text-zinc-100 font-bold hover:bg-zinc-700 transition-colors cursor-pointer">
                          <Upload size={12}/> Import JSON
                          <input type="file" accept=".json,application/json" onChange={handleImportJSON} className="hidden" />
                        </label>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
