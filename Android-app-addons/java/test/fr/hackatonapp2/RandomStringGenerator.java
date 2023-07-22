package test.fr.hackatonapp2;

import java.security.SecureRandom;

public class RandomStringGenerator {
        private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        private static final int LENGTH = 12;

        public static String generateRandomString() {
            SecureRandom random = new SecureRandom();
            StringBuilder sb = new StringBuilder(LENGTH);

            for (int i = 0; i < LENGTH; i++) {
                int randomIndex = random.nextInt(CHARACTERS.length());
                char randomChar = CHARACTERS.charAt(randomIndex);
                sb.append(randomChar);
            }

            return sb.toString();
        }

        public static void main(String[] args) {
            String randomString = generateRandomString();
            System.out.println("random string : " + randomString);
        }
}
