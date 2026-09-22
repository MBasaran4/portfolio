import { Dictionary } from "../types";

export const trDictionary: Dictionary = {
  locale: "tr",
  nav: {
    about: "Hakkımda",
    projects: "Projeler",
    experience: "Deneyim",
    skills: "Yetenekler",
    contact: "İletişim",
  },
  hero: {
    status: "YENİ FIRSATLARA AÇIK",
    titleFirst: "MÜCAHİT",
    titleLast: "BAŞARAN",
    titleRole: "Bilgisayar Mühendisi & Yazılım Geliştirici",
    description:
      "Akıllı, kullanışlı ve modern yazılım deneyimleri geliştiriyorum. Mühendislik prensiplerini modern yapay zeka ve web teknolojileriyle birleştirmeye odaklıyım.",
    viewProjects: "Projeleri İncele",
    downloadCv: "CV İndir",
    cvTr: "Türkçe CV",
    cvEn: "English CV",
    cvUponRequest: "CV Talep Üzerine",
    contact: "İletişime Geç",
    scrollToExplore: "Keşfetmek için kaydırın",
    tags: {
      softwareDev: "Yazılım Geliştirme",
      modernWeb: "Modern Web",
      aiMl: "Yapay Zeka & ML",
    },
  },
  about: {
    sectionNum: "01",
    sectionTitle: "Hakkımda & Mühendislik Felsefesi",
    sectionSubtitle:
      "Temel bilgisayar bilimleri ilkelerini modern ürün mühendisliği ve uygulamalı makine öğrenimi ile birleştiriyorum.",
    leadBio:
      "Kullanışlı yazılımlar, yapay zeka destekli uygulamalar ve modern web deneyimleri geliştirmeye odaklanan bir Bilgisayar Mühendisliği mezunuyum.",
    degreeDesc:
      "Çankırı Karatekin Üniversitesi Bilgisayar Mühendisliği Bölümü'nde (2026 Mezuniyeti) aldığım lisans eğitimi sürecinde; duyarlı, güvenilir web platformları, geliştirici araçları ve makine öğrenimi ile modern dil modelleriyle güçlendirilen akıllı sistemler geliştirmeye yoğunlaştım.",
    philosophyDesc:
      "Yüzeysel karmaşıklık yerine sürdürülebilir mimariyi, tipli sistemleri ve amaç odaklı kullanıcı deneyimini ön planda tutuyorum. Her projeye bir mühendislik bakış açısıyla yaklaşıyor, somut problemlere temiz ve ölçeklenebilir kodla çözümler üretiyorum.",
    degreeBadge: "Lisans · Bilgisayar Mühendisliği · 2026",
    currentlyBuildingTitle: "Şu Anda Geliştirilenler",
    currentlyBuildingDesc: "Kullanışlı web araçları & yapay zeka destekli yazılımlar",
    currentlyBuildingSub: "HesapKitap araç seti & AgentVerge güvenlik testleri",
    exploringTitle: "İncelenen Alanlar",
    exploringDesc: "Otonom ajanlar, RAG & Ses Sınıflandırması",
    exploringSub: "LLM sistemleri · Agentic iş akışları · Ses ML modelleri",
    interestedInTitle: "İlgi Alanları",
    interestedInDesc: "Yazılım Mühendisliği & Yapay Zeka Geliştirici Rolleri",
    interestedInSub: "Yenilikçi ekiplerle iş birliği ve mühendislik projeleri",
  },
  whatIBuild: {
    badge: "UZMANLIK ALANLARI",
    title: "Neler Geliştiriyorum",
    webTitle: "Web Uygulamaları",
    webTagline: "Modern, duyarlı ve ölçeklenebilir web deneyimleri",
    webDesc:
      "React, Next.js ve TypeScript kullanarak erişilebilir kullanıcı arayüzleri ve yüksek performanslı full-stack web uygulamaları tasarlıyorum. Temiz durum yönetimi, modüler bileşenler ve akıcı uyumluluğa odaklanıyorum.",
    aiTitle: "Yapay Zeka & Akıllı Sistemler",
    aiTagline: "Makine öğrenimi, ses analizi ve LLM iş akışları",
    aiDesc:
      "Makine öğrenimi algoritmalarını pratik problemlere uyguluyorum; araç seslerinden mekanik arıza tespiti, prompt mühendisliği, RAG boru hatları ve insan yetkinliğini artıran ajan sistemleri tasarlıyorum.",
    toolsTitle: "Geliştirici Araçları",
    toolsTagline: "Otomasyon, güvenlik kontrolleri ve değerlendirme sistemleri",
    toolsDesc:
      "Geliştirme süreçlerini hızlandıran ve kod doğruluğunu denetleyen dahili geliştirici araçları, CI/CD güvenlik testleri ve yapay zeka ajan güvenilirlik altyapıları inşa ediyorum.",
  },
  projects: {
    sectionNum: "02",
    sectionTitle: "Öne Çıkan Projeler",
    sectionSubtitle:
      "Web mimarileri, yapay zeka test sistemleri ve akustik sinyal işleme odaklı seçkin mühendislik projeleri.",
    statusCompleted: "Tamamlandı",
    statusInDev: "Geliştirme Aşamasında",
    statusResearch: "Araştırma Projesi",
    githubButton: "GitHub ↗",
    liveDemoButton: "Canlı Demo ↗",
    previewBadge: "Teknik Önizleme",
    previewSchematic: "Mimari Şema",
    illustrativePreview: "Temsili Önizleme",
    items: {
      hesapkitap: {
        subtitle: "Modüler ve Kullanışlı Web Hesaplama Araçları Platformu",
        description:
          "Çeşitli günlük ve özelleşmiş hesaplama araçlarını tek bir modern web uygulamasında birleştiren pratik platform.",
        longDescription:
          "Her hesaplama aracının izole ve test edilebilir bir birim olarak çalıştığı modüler bir mimariyle geliştirildi. Hafif durum yönetimi, tema/karanlık mod desteği, çoklu dil altyapısı (i18n) ve mobil uyumlu duyarlı tasarıma sahiptir.",
        highlights: [
          "Modüler hesaplayıcı mimarisi",
          "Tek platformda çoklu araç desteği",
          "Dahili tema ve karanlık mod altyapısı",
          "Uluslararasılaşma (i18n) dil desteği",
          "Mobil öncelikli duyarlı arayüz",
        ],
      },
      agentverge: {
        subtitle: "Yapay Zeka Ajan Güvenlik, Değerlendirme & Güvenilirlik Çerçevesi",
        description:
          "Otonom yapay zeka ajanlarını ve araç çağırma boru hatlarını test etmek, kıyaslamak ve güvene almak için geliştirici odaklı güvenlik değerlendirme aracı.",
        longDescription:
          "LLM güdümlü iş akışlarında güvenlik, deterministik değerlendirme ve zafiyet tespitini ele alır. AgentVerge, dağıtım öncesi istenmeyen ajan davranışlarını, prompt sızıntılarını ve güvenilirlik hatalarını yakalamak için CI/CD süreçlerine entegre olur.",
        highlights: [
          "Yapay zeka ajan davranışsal değerlendirme çatısı",
          "Otomatik CI/CD güvenlik doğrulaması",
          "Araç çağırma güvenilirlik testi",
          "Geliştirici odaklı entegrasyon API'si",
          "Aktif araştırma ve geliştirme süreci",
        ],
      },
      carsound: {
        subtitle: "Araç Mekanik Arıza Teşhisi İçin Akustik ML Analizi",
        description:
          "Araç ses kayıtlarından olası mekanik arıza türlerini tespit ve sınıflandırma odaklı Bilgisayar Mühendisliği lisans mezuniyet projesi.",
        longDescription:
          "Normal motor sesleri ile çeşitli mekanik arıza durumlarını ayırt etmek amacıyla dijital sinyal işleme (spektrogram dönüşümü, MFCC öznitelik çıkarımı) ve denetimli makine öğrenimi algoritmalarını birleştirir.",
        highlights: [
          "Bilgisayar Mühendisliği Lisans Mezuniyet Projesi",
          "MFCC ve spektrogramlarla ses öznitelik çıkarımı",
          "Mekanik anomali ses sınıflandırması",
          "Akustik sinyal ön işleme boru hattı",
          "Kapsamlı deneysel mühendislik değerlendirmesi",
        ],
      },
    },
  },
  github: {
    sectionNum: "03",
    sectionTitle: "GitHub Projeleri",
    sectionSubtitle:
      "Doğrudan GitHub üzerinden sunulan güncel repository ve açık kaynak çalışmaları.",
    viewProfile: "GitHub Profilini Ziyaret Et ↗",
    setupTitle: "GitHub Entegrasyonu Hazır",
    setupMessage:
      "Canlı repository akışını başlatmak için .env.local dosyasında GITHUB_USERNAME değişkenini tanımlayabilirsiniz.",
    setupEnvHint: "// .env.local içinde",
    unavailable: "GitHub projelerine şu anda ulaşılamıyor.",
    exploreDirectly: "Doğrudan GitHub üzerinden inceleyin",
    noRepos: "Bu hesap için herkese açık repository bulunamadı.",
    noDescription: "Açıklama belirtilmemiş.",
  },
  experience: {
    sectionNum: "04",
    sectionTitle: "Deneyim & Stajlar",
    sectionSubtitle:
      "Yazılım geliştirme ve sistem mühendisliği alanlarında uygulamalı staj çalışmaları.",
    dijitalAdam: {
      role: "Yazılım Mühendisliği Stajyeri",
      location: "Balıkesir, Türkiye",
      period: "Staj Dönemi",
      bullets: [
        "Modern JavaScript ve TypeScript ekosistemleri kullanılarak full-stack web geliştirme süreçlerinde yer alındı.",
        "Kullanıcı arayüzleri, bileşen modülaritesi ve duyarlı düzen tasarımları üzerinde çalışıldı.",
        "Çevik kod inceleme, sürüm kontrol disiplini ve hata çözme süreçlerine katkı sağlandı.",
      ],
    },
    cakuIt: {
      role: "Donanım & BT Teknik Servis Stajyeri",
      location: "Çankırı, Türkiye",
      period: "Staj Dönemi",
      bullets: [
        "Üniversite birimlerinde donanım teşhisleri, bakım ve iş istasyonu kurulum süreçleri yürütüldü.",
        "Kurumsal yerel ağ bağlantıları, işletim sistemi konfigürasyonları ve çevre birim donanımları sorunları giderildi.",
        "Teknik dokümantasyon tutuldu ve kurumsal altyapı için hızlı donanım destek çözümleri sağlandı.",
      ],
    },
  },
  education: {
    sectionNum: "05",
    sectionTitle: "Eğitim & Akademik Bilgiler",
    sectionSubtitle:
      "Bilgisayar Mühendisliği alanında temel ilkeler ve uygulamalı araştırma.",
    degreeLevel: "Lisans Eğitimi",
    classOf: "2026 Mezuniyeti",
    institution: "Çankırı Karatekin Üniversitesi",
    degreeName: "Bilgisayar Mühendisliği Lisans Programı",
    details: [
      "Temel müfredat: Algoritmalar, Veri Yapıları, İşletim Sistemleri, Veritabanı Yönetimi, Yazılım Mühendisliği & Yapay Zeka.",
      "Avrupa Erasmus+ öğrenci hareketliliği programına hak kazanıldı.",
    ],
    erasmusNote: "Erasmus+ Öğrenci Hareketliliği Adayı",
    capstoneTag: "Lisans Bitirme Projesi",
    capstoneSubtitle: "Akustik Ses Yapay Zekası / Makine Öğrenimi",
    capstoneCoreDisciplines: "Temel Mühendislik Alanları:",
    capstoneShowcase: "Mühendislik Mezuniyet Vitrini",
  },
  skills: {
    sectionNum: "06",
    sectionTitle: "Teknik Yetkinlikler",
    sectionSubtitle:
      "Akademik ve uygulamalı projelerde aktif olarak kullanılan diller, sistemler ve araçlar.",
    verifiedCompetency: "Doğrulanmış Yetkinlik",
    activeStatus: "● Aktif",
    categories: {
      languages: "Diller",
      frontend: "Frontend",
      backend: "Backend",
      aiMl: "Yapay Zeka & ML",
      tools: "Araçlar & Altyapı",
    },
  },
  kinetic: {
    text: "SİSTEMLER · MİMARİ · YAZILIM · YAPAY ZEKA · ALGORİTMALAR ·",
  },
  contact: {
    pill: "İLETİŞİME GEÇİN",
    headingLine1: "Birlikte Bir Şeyler",
    headingLine2: "İnşa Edelim.",
    description:
      "Bir projeniz, iş fırsatınız mı var veya yapay zeka ajanları, makine öğrenimi ve modern web sistemleri üzerine konuşmak mı istiyorsunuz?",
    copyEmail: "E-postayı Kopyala",
    copied: "Panoya Kopyalandı!",
    emailUponRequest: "E-posta Talep Üzerine",
    emailSetupInfo:
      "E-posta adresi .env.local dosyasında NEXT_PUBLIC_CONTACT_EMAIL olarak tanımlanabilir.",
    emailClipboardError: "Panoya erişilemedi. Lütfen manuel kopyalayınız.",
    downloadCv: "CV İndir",
    cvTr: "Türkçe CV",
    cvEn: "English CV",
    cvUponRequest: "CV Talep Üzerine",
    cvPendingTooltip: "CV dosyası /public/cv/ klasörüne eklendiğinde aktif olacaktır.",
    locationNote: "Türkiye",
    classNote: "Bilgisayar Mühendisliği (2026)",
  },
  footer: {
    roleInfo: "Bilgisayar Mühendisi & Yazılım Geliştirici",
    builtWith: "Next.js, TypeScript ve Tailwind CSS ile geliştirildi",
    backToTop: "Yukarı Çık",
  },
};
