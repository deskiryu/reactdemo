using Microsoft.Maui.Controls;

namespace CutesyFinanceMaui
{
    public partial class LoginPage : ContentPage
    {
        public LoginPage()
        {
            InitializeComponent();
        }

        private void OnLogin(object sender, EventArgs e)
        {
            // Validate credentials (placeholder)
            DisplayAlert("Login", "Login successful", "OK");
        }
    }
}
