## Kurulum

Bu bölüm, projeyi yerel geliştirme ortamınızda nasıl kurabileceğinizi adım adım açıklar. Projeyi çalıştırmadan önce, gerekli olan tüm dış bağımlılıkların kurulu olduğundan emin olun.

### Önkoşullar

Projeyi çalıştırmadan önce sisteminizde aşağıdaki yazılımların kurulu olması gerekmektedir:

- Node.js - [Node.js resmi web sitesinden](https://nodejs.org/) en son sürümü indirip kurabilirsiniz.
- MongoDB - [MongoDB'nin resmi web sitesinden](https://www.mongodb.com/try/download/community) MongoDB Community Server'ı indirip kurabilirsiniz. MongoDB'yi yerel olarak çalıştırabilir veya bir MongoDB hizmeti(API anahtarını `server.js` içerisinde kullanarak ilgili değişikliği yapıp) kullanabilirsiniz.

* Yerel olarak MongoDB çalıştırmak için `.env` dosyası içerisindeki `MONGO_URI` değişkeninin, MongoDB Compass uygulamasındaki URI ile aynı olduğundan emin olun.

### Projeyi Kurma

1. **Repo'yu Klonlayın**

    Projeyi yerel bilgisayarınıza klonlamak için aşağıdaki komutu terminalinize yapıştırın:

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Bağımlılıkları Yükleyin**

    Node.js bağımlılıklarını yüklemek için projenizin kök dizininde aşağıdaki komutu çalıştırın:

    ```bash
    npm install
    ```

3. **Uygulamayı Çalıştırın**

    Uygulamayı geliştirme modunda çalıştırmak için:

    ```bash
    npm run start:dev
    ```

    Üretim modunda çalıştırmak için:

    ```bash
    npm run start:prod
    ```

Bu adımlar, projenizin başarıyla kurulup çalıştırılmasını sağlamak için gereklidir. Projeyi doğru şekilde kurduktan sonra, uygulamanızın geliştirme veya üretim modunda sorunsuz çalıştığını görebilirsiniz.
