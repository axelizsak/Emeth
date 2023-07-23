package test.fr.hackatonapp2;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

import java.security.SecureRandom;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.widget.Button;

import java.io.File;
import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.MultipartBody;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class UploadActivity extends Activity {

    private static final int REQUEST_CODE_SELECT_FILE = 100;
    private static final String TAG = "UploadActivity";

    private Button selectFileButton;
    private Button uploadButton;

    private Button Cancel;

    private Uri selectedFileUri;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_page2);

        selectFileButton = findViewById(R.id.selectFileButton);
        uploadButton = findViewById(R.id.uploadButton);

        selectFileButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                openFilePicker();
            }
        });
        this.Cancel = (Button) findViewById(R.id.cancel);

        Cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent otherActivity = new Intent(getApplicationContext(), menuActivity.class);
                startActivity(otherActivity);
                Log.d("TAG", "Message de débogage");
                finish();
            }
        });
    }

    private void openFilePicker() {
        Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
        intent.setType("*/*");
        startActivityForResult(intent, REQUEST_CODE_SELECT_FILE);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == REQUEST_CODE_SELECT_FILE && resultCode == RESULT_OK) {
            if (data != null) {
                selectedFileUri = data.getData();
                Log.d(TAG, "Selected file URI: " + selectedFileUri.toString());
            }
        }
    }

    private void uploadFile(Uri fileUri) {
        // Code pour envoyer le fichier vers le serveur
        // Vous pouvez utiliser des bibliothèques telles que OkHttp ou Retrofit pour faciliter l'envoi de fichiers

        // Exemple d'utilisation d'OkHttp :
        File file = new File(fileUri.getPath());

        // Créez une instance de OkHttpClient
        okhttp3.OkHttpClient client = new okhttp3.OkHttpClient();

        // Créez une instance de RequestBody contenant le fichier
        RequestBody requestBody = new MultipartBody.Builder()
                .setType(MultipartBody.FORM)
                .addFormDataPart("file", file.getName(), RequestBody.create(MediaType.parse("multipart/form-data"), file))
                .build();

        // Créez une instance de Request avec l'URL de votre serveur
        Request request = new Request.Builder()
                .url("https://5.196.27.86/")
                .post(requestBody)
                .build();

        // Envoyez la requête asynchrone
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // Gérer les échecs de l'envoi du fichier
                Log.e(TAG, "Failed to upload file", e);
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                // Gérer la réponse du serveur
                if (response.isSuccessful()) {
                    Log.d(TAG, "File uploaded successfully");
                } else {
                    Log.e(TAG, "File upload failed: " + response.code());
                }
                response.close();
            }
        });
    }
}
