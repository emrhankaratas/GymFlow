document.addEventListener('DOMContentLoaded', () => {

  // ====================================
  //  PASSWORD TOGGLE
  // ====================================
  window.togglePassword = (inputId, btn) => {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🔓';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  };

  // ====================================
  //  PASSWORD STRENGTH METER
  // ====================================
  const regPassword = document.getElementById('regPassword');
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');

  if (regPassword && strengthBar) {
    regPassword.addEventListener('input', () => {
      const val = regPassword.value;
      let score = 0;

      if (val.length >= 8) score++;
      if (val.length >= 12) score++;
      if (/[A-Z]/.test(val)) score++;
      if (/[0-9]/.test(val)) score++;
      if (/[^A-Za-z0-9]/.test(val)) score++;

      const levels = [
        { width: '0%', color: '', text: '' },
        { width: '20%', color: '#ff2a2a', text: 'Çok Zayıf' },
        { width: '40%', color: '#ff8800', text: 'Zayıf' },
        { width: '60%', color: '#ffd700', text: 'Orta' },
        { width: '80%', color: '#00ff88', text: 'Güçlü' },
        { width: '100%', color: '#00f0ff', text: 'Çok Güçlü' },
      ];

      const level = levels[score] || levels[0];
      strengthBar.style.width = level.width;
      strengthBar.style.background = level.color;
      if (strengthText) {
        strengthText.textContent = val.length > 0 ? level.text : '';
        strengthText.style.color = level.color;
      }
    });
  }

  // ====================================
  //  LOGIN FORM
  // ====================================
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;

      // Demo: accept any login
      const btn = loginForm.querySelector('.auth-submit');
      btn.textContent = 'Giriş yapılıyor...';
      btn.disabled = true;

      setTimeout(() => {
        // Simulate login success
        btn.textContent = '✓ Giriş Başarılı!';
        btn.style.background = 'var(--success-color)';

        setTimeout(() => {
          window.location.href = 'index.html';
        }, 1000);
      }, 1500);
    });
  }

  // ====================================
  //  REGISTER FORM
  // ====================================
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const password = document.getElementById('regPassword').value;
      const confirmPassword = document.getElementById('regConfirmPassword').value;

      // Password match check
      if (password !== confirmPassword) {
        alert('Şifreler eşleşmiyor! Lütfen kontrol edin.');
        return;
      }

      // Password length check
      if (password.length < 8) {
        alert('Şifre en az 8 karakter olmalıdır.');
        return;
      }

      const btn = registerForm.querySelector('.auth-submit');
      btn.textContent = 'Hesap oluşturuluyor...';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = '✓ Kayıt Başarılı!';
        btn.style.background = 'var(--success-color)';

        setTimeout(() => {
          window.location.href = 'login.html';
        }, 1000);
      }, 1500);
    });
  }

});
