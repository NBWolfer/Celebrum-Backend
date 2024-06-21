function errorHandler(err, req, res, next) {
    // HTTP status kodunu belirle: hata kodu varsa kullan, yoksa 500
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    
    if (process.env.NODE_ENV === 'development') {
        console.log(err);
    }

    var message;

    if (statusCode === 500) {
        message = 'Internal Server Error';
    }
    else {
        message = err.message;
    }
    res.status(statusCode).json({
        message: message,  // Basit bir hata mesajı döndür
        stack: process.env.NODE_ENV === 'development' ? err.stack : '🥞' // Geliştirme ortamında hata stack'ini göster
    });
    next();
}

module.exports = errorHandler;
