package test.fr.hackatonapp2;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.hardware.biometrics.BiometricPrompt;
import android.hardware.biometrics.BiometricPrompt.CryptoObject;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.biometric.BiometricManager;

import java.security.Signature;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class MainActivity extends AppCompatActivity {

    private Button worldcoin;
    private Button button;
    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.AuthenticationCallback authenticationCallback;
    private CancellationSignal cancellationSignal;
    private Button register;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        this.worldcoin = (Button) findViewById(R.id.worldcoin);

        worldcoin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent otherActivity = new Intent(getApplicationContext(), loginWorldCoin.class);
                startActivity(otherActivity);
                Log.d("TAG", "Message de débogage de Worldcoin");
                finish();
            }
        });


        this.register = (Button) findViewById(R.id.register);

        register.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent otherActivity = new Intent(getApplicationContext(), loginActivity.class);
                startActivity(otherActivity);
                Log.d("TAG", "Message de débogage");
                finish();
            }
        });

        button = findViewById(R.id.Login);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startBiometricPrompt();
            }
        });

        executor = Executors.newSingleThreadExecutor();
        biometricPrompt = new BiometricPrompt.Builder(MainActivity.this)
                .setTitle("Titre de la boîte de dialogue")
                .setSubtitle("Sous-titre de la boîte de dialogue")
                .setDescription("Description de la boîte de dialogue")
                .setNegativeButton("Annuler", MainActivity.this.getMainExecutor(), new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
                        // Gérer l'annulation de l'authentification biométrique
                    }
                })
                .build();

        authenticationCallback = new BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationSucceeded(@NonNull BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                // La reconnaissance faciale est réussie
                Toast.makeText(MainActivity.this, "Reconnaissance faciale réussie", Toast.LENGTH_SHORT).show();
                // Redirection vers une deuxième page
                startActivity(new Intent(MainActivity.this, UploadActivity.class));
            }

            @Override
            public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                // Une erreur s'est produite lors de la reconnaissance faciale
                Toast.makeText(MainActivity.this, "Erreur de reconnaissance faciale: " + errString, Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                // La reconnaissance faciale a échoué
                Toast.makeText(MainActivity.this, "Échec de la reconnaissance faciale", Toast.LENGTH_SHORT).show();
            }
        };
    }

    private void startBiometricPrompt() {
        BiometricManager biometricManager = BiometricManager.from(MainActivity.this);

        if (biometricManager.canAuthenticate() == BiometricManager.BIOMETRIC_SUCCESS) {
            // L'appareil prend en charge la reconnaissance faciale

            cancellationSignal = new CancellationSignal();

            biometricPrompt.authenticate(new CryptoObject((Signature) null),
                    cancellationSignal,
                    MainActivity.this.getMainExecutor(),
                    authenticationCallback);
        } else {
            // L'appareil ne prend pas en charge la reconnaissance faciale ou aucune empreinte digitale n'est enregistrée
            Toast.makeText(MainActivity.this, "La reconnaissance faciale n'est pas disponible", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (cancellationSignal != null) {
            cancellationSignal.cancel();
        }
    }
}
