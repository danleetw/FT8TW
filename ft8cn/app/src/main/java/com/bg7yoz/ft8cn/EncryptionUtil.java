package com.bg7yoz.ft8cn;

import android.content.Context;
import android.provider.Settings;
import android.util.Base64;

import java.security.MessageDigest;
import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

public class EncryptionUtil {

    // 獲取 Android ID 作為密鑰的基礎
    public static String getAndroidId(Context context) {
        return Settings.Secure.getString(context.getContentResolver(), Settings.Secure.ANDROID_ID);
    }

    // 根據 Android ID 生成 AES 密鑰
    public static SecretKey generateKeyFromAndroidId(String androidId) throws Exception {
        MessageDigest sha = MessageDigest.getInstance("SHA-256");
        byte[] key = sha.digest(androidId.getBytes("UTF-8"));
        byte[] keyBytes = new byte[16];
        System.arraycopy(key, 0, keyBytes, 0, keyBytes.length); // AES 密鑰必須是 16, 24, 或 32 字節
        return new SecretKeySpec(keyBytes, "AES");
    }

    // 加密密碼
    public static String encryptPassword(String password, Context context) throws Exception {
        String androidId = getAndroidId(context);
        SecretKey secretKey = generateKeyFromAndroidId(androidId);

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.ENCRYPT_MODE, secretKey);
        byte[] encryptedValue = cipher.doFinal(password.getBytes("UTF-8"));

        return Base64.encodeToString(encryptedValue, Base64.DEFAULT);
    }

    // 解密密碼
    public static String decryptPassword(String encryptedPassword, Context context) throws Exception {
        String androidId = getAndroidId(context);
        SecretKey secretKey = generateKeyFromAndroidId(androidId);

        Cipher cipher = Cipher.getInstance("AES/ECB/PKCS5Padding");
        cipher.init(Cipher.DECRYPT_MODE, secretKey);
        byte[] decryptedValue = cipher.doFinal(Base64.decode(encryptedPassword, Base64.DEFAULT));

        return new String(decryptedValue, "UTF-8");
    }
}
