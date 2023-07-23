package test.fr.hackatonapp2;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;

public class menuActivity extends Activity {

    private Button kycButton;
    private String kycStatus = "no"; // État KYC
    private Button Cancel;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_menu);

        kycButton = findViewById(R.id.kycButton);
        setButtonColor();

        kycButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                // Redirection vers UploadActivity
                if (setButtonColor() == 1) {
                    Intent intent = new Intent(menuActivity.this, UploadActivity.class);
                    startActivity(intent);
                }
            }
        });
        this.Cancel = (Button) findViewById(R.id.cancel);

        Cancel.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent otherActivity = new Intent(getApplicationContext(), loginActivity.class);
                startActivity(otherActivity);
                Log.d("TAG", "Message de débogage");
                finish();
            }
        });
    }

    private int setButtonColor() {
        int colorResId;
        int i;

        switch (kycStatus) {
            case "ok":
                colorResId = R.color.green;
                i = 0;
                break;
            case "pending":
                colorResId = R.color.orange;
                i = 0;
                break;
            case "no":
                colorResId = R.color.red;
                i = 1;
                break;
            default:
                colorResId = R.color.gray;
                i = 0;
                break;
        }
        kycButton.setBackgroundColor(getResources().getColor(colorResId));
        return i;
    }
}
