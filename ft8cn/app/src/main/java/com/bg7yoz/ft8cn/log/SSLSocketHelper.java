package com.bg7yoz.ft8cn.log;



import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.X509TrustManager;
import javax.net.ssl.TrustManager;

import java.security.SecureRandom;
import java.security.cert.X509Certificate;

/*
public class SSLSocketHelper {
    public static SSLSocketFactory getSSLSocketFactory() throws Exception {
        SSLContext context = SSLContext.getInstance("TLS");
        context.init(null, null, null);  // 使用預設的 trust manager
        return context.getSocketFactory();
    }
}
*/
public class SSLSocketHelper {
    public static SSLSocketFactory getSSLSocketFactory() throws Exception {
        TrustManager[] trustAllCerts = new TrustManager[] {
            new X509TrustManager() {
                public void checkClientTrusted(X509Certificate[] chain, String authType) {}
                public void checkServerTrusted(X509Certificate[] chain, String authType) {}
                public X509Certificate[] getAcceptedIssuers() { return new X509Certificate[0]; }
            }
        };

        SSLContext context = SSLContext.getInstance("TLS");
        context.init(null, trustAllCerts, new SecureRandom());
        return context.getSocketFactory();
    }
}