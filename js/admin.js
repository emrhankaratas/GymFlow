document.addEventListener('DOMContentLoaded', () => {

  // ====================================
  //  SHARED DATA (Demo / Dummy)
  // ====================================
  let members = [
    { id: '1001', name: 'Ahmet Yılmaz', email: 'ahmet@mail.com', phone: '0555 111 22 33', plan: 'Pro', joinDate: '2026-01-15', status: 'Active' },
    { id: '1002', name: 'Elif Demir', email: 'elif@mail.com', phone: '0532 222 33 44', plan: 'Elite', joinDate: '2026-02-20', status: 'Active' },
    { id: '1003', name: 'Mehmet Kara', email: 'mehmet@mail.com', phone: '0544 333 44 55', plan: 'Başlangıç', joinDate: '2026-03-05', status: 'Inactive' },
    { id: '1004', name: 'Selin Aydın', email: 'selin@mail.com', phone: '0533 444 55 66', plan: 'Pro', joinDate: '2026-04-10', status: 'Active' },
    { id: '1005', name: 'Kerem Öztürk', email: 'kerem@mail.com', phone: '0541 555 66 77', plan: 'Elite', joinDate: '2026-04-15', status: 'Active' },
    { id: '1006', name: 'Zeynep Aksoy', email: 'zeynep@mail.com', phone: '0539 666 77 88', plan: 'Pro', joinDate: '2026-04-22', status: 'Active' },
    { id: '1007', name: 'Burak Şahin', email: 'burak@mail.com', phone: '0546 777 88 99', plan: 'Başlangıç', joinDate: '2026-04-25', status: 'Inactive' },
    { id: '1008', name: 'Deniz Yıldırım', email: 'deniz@mail.com', phone: '0537 888 99 00', plan: 'Elite', joinDate: '2026-04-28', status: 'Active' },
  ];

  let classes = [
    { id: 'c1', name: 'Kickbox', trainer: 'Ahmet Yılmaz', day: 'Pazartesi', time: '10:00', duration: 60, capacity: 20, enrolled: 16, emoji: '🥊' },
    { id: 'c2', name: 'Yoga & Pilates', trainer: 'Elif Demir', day: 'Salı', time: '09:00', duration: 45, capacity: 25, enrolled: 22, emoji: '🧘' },
    { id: 'c3', name: 'HIIT / CrossFit', trainer: 'Murat Kaya', day: 'Çarşamba', time: '18:00', duration: 50, capacity: 15, enrolled: 15, emoji: '🔥' },
    { id: 'c4', name: 'Fonksiyonel Antrenman', trainer: 'Zeynep Aksoy', day: 'Perşembe', time: '11:00', duration: 45, capacity: 20, enrolled: 12, emoji: '💪' },
    { id: 'c5', name: 'Spinning', trainer: 'Burak Korkmaz', day: 'Cuma', time: '07:30', duration: 40, capacity: 30, enrolled: 28, emoji: '🚴' },
    { id: 'c6', name: 'Zumba', trainer: 'Selin Çelik', day: 'Cumartesi', time: '10:00', duration: 55, capacity: 25, enrolled: 20, emoji: '💃' },
  ];

  const activities = [
    { text: 'Deniz Yıldırım kayıt oldu', time: '5 dk önce', color: 'green' },
    { text: 'Kickbox dersi başladı', time: '30 dk önce', color: 'blue' },
    { text: 'Burak Şahin üyeliği dondurdu', time: '1 sa önce', color: 'red' },
    { text: 'Spinning dersi güncellendi', time: '2 sa önce', color: 'yellow' },
    { text: 'Selin Aydın Elite plana geçti', time: '3 sa önce', color: 'green' },
    { text: 'Yeni eğitmen eklendi: Burak Korkmaz', time: '5 sa önce', color: 'blue' },
  ];

  // ====================================
  //  UTILITY: Toast Notification
  // ====================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = type === 'success' ? `✓ ${message}` : `✗ ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ====================================
  //  UTILITY: Modal Close Handlers
  // ====================================
  document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
      const modalId = btn.dataset.modal;
      if (modalId) document.getElementById(modalId)?.classList.remove('show');
    });
  });

  window.addEventListener('click', (e) => {
    document.querySelectorAll('.modal').forEach(m => {
      if (e.target === m) m.classList.remove('show');
    });
  });

  // ====================================
  //  UTILITY: Bar Chart Renderer
  // ====================================
  function renderBarChart(containerId, data) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = '';
    const max = Math.max(...data.map(d => d.value));

    data.forEach((d, i) => {
      const col = document.createElement('div');
      col.className = 'bar-column';
      col.innerHTML = `
        <div class="bar-value">${d.value}</div>
        <div class="bar" style="height: 0%" title="${d.label}: ${d.value}"></div>
        <div class="bar-label">${d.label}</div>
      `;
      container.appendChild(col);

      setTimeout(() => {
        col.querySelector('.bar').style.height = `${(d.value / max) * 100}%`;
      }, i * 80);
    });
  }

  // ====================================
  //  PAGE: DASHBOARD (admin.html)
  // ====================================
  const weeklyChart = document.getElementById('weeklyChart');
  if (weeklyChart) {
    const weeklyData = [
      { label: 'Pzt', value: 145 },
      { label: 'Sal', value: 132 },
      { label: 'Çar', value: 168 },
      { label: 'Per', value: 155 },
      { label: 'Cum', value: 189 },
      { label: 'Cmt', value: 210 },
      { label: 'Paz', value: 95 },
    ];
    renderBarChart('weeklyChart', weeklyData);
  }

  // Activity List
  const activityList = document.getElementById('activityList');
  if (activityList) {
    activities.forEach(a => {
      const item = document.createElement('div');
      item.className = 'activity-item';
      item.innerHTML = `
        <div class="activity-dot ${a.color}"></div>
        <div class="activity-text">${a.text}</div>
        <div class="activity-time">${a.time}</div>
      `;
      activityList.appendChild(item);
    });
  }

  // Dashboard quick table
  const dashboardTableBody = document.getElementById('dashboardTableBody');
  if (dashboardTableBody) {
    const last5 = [...members].reverse().slice(0, 5);
    last5.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${m.id}</td>
        <td style="font-weight:500">${m.name}</td>
        <td><span class="badge badge-plan">${m.plan}</span></td>
        <td>${m.joinDate}</td>
        <td><span class="badge ${m.status === 'Active' ? 'badge-active' : 'badge-inactive'}">${m.status === 'Active' ? 'Aktif' : 'Pasif'}</span></td>
      `;
      dashboardTableBody.appendChild(tr);
    });
  }

  // ====================================
  //  PAGE: MEMBERS (admin-members.html)
  // ====================================
  const memberTableBody = document.getElementById('memberTableBody');
  const memberCount = document.getElementById('memberCount');
  const memberSearch = document.getElementById('memberSearch');
  const memberFilter = document.getElementById('memberFilter');

  function renderMemberTable(filter = 'all', search = '') {
    if (!memberTableBody) return;
    memberTableBody.innerHTML = '';
    const searchLower = search.toLowerCase();

    const filtered = members.filter(m => {
      const matchFilter = filter === 'all' || m.status === filter;
      const matchSearch = !search || m.name.toLowerCase().includes(searchLower) || m.email.toLowerCase().includes(searchLower);
      return matchFilter && matchSearch;
    });

    filtered.forEach(m => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>#${m.id}</td>
        <td style="font-weight:500">${m.name}</td>
        <td>${m.email}</td>
        <td><span class="badge badge-plan">${m.plan}</span></td>
        <td>${m.joinDate}</td>
        <td><span class="badge ${m.status === 'Active' ? 'badge-active' : 'badge-inactive'}">${m.status === 'Active' ? 'Aktif' : 'Pasif'}</span></td>
        <td>
          <button class="action-btn edit" title="Durum Değiştir" onclick="editMember('${m.id}')">✏️</button>
          <button class="action-btn delete" title="Sil" onclick="deleteMember('${m.id}')">🗑️</button>
        </td>
      `;
      memberTableBody.appendChild(tr);
    });

    if (memberCount) memberCount.textContent = `Toplam: ${filtered.length} üye`;
  }

  if (memberTableBody) {
    renderMemberTable();
  }

  if (memberSearch) memberSearch.addEventListener('input', () => renderMemberTable(memberFilter?.value, memberSearch.value));
  if (memberFilter) memberFilter.addEventListener('change', () => renderMemberTable(memberFilter.value, memberSearch?.value));

  // Add Member Modal
  document.getElementById('openAddMemberModal')?.addEventListener('click', () => {
    document.getElementById('addMemberModal')?.classList.add('show');
  });

  document.getElementById('addMemberForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newMember = {
      id: (1000 + members.length + 1).toString(),
      name: document.getElementById('memberName').value,
      email: document.getElementById('memberEmail').value,
      phone: document.getElementById('memberPhone')?.value || '',
      plan: document.getElementById('memberPlan').value,
      joinDate: new Date().toISOString().split('T')[0],
      status: 'Active'
    };
    members.push(newMember);
    renderMemberTable(memberFilter?.value, memberSearch?.value);
    document.getElementById('addMemberModal')?.classList.remove('show');
    e.target.reset();
    showToast(`${newMember.name} başarıyla eklendi!`);
  });

  window.deleteMember = (id) => {
    const member = members.find(m => m.id === id);
    if (confirm(`"${member?.name}" adlı üyeyi silmek istediğinize emin misiniz?`)) {
      members = members.filter(m => m.id !== id);
      renderMemberTable(memberFilter?.value, memberSearch?.value);
      showToast('Üye silindi', 'error');
    }
  };

  window.editMember = (id) => {
    const member = members.find(m => m.id === id);
    if (!member) return;
    member.status = member.status === 'Active' ? 'Inactive' : 'Active';
    renderMemberTable(memberFilter?.value, memberSearch?.value);
    showToast(`${member.name} durumu ${member.status === 'Active' ? 'Aktif' : 'Pasif'} olarak güncellendi`);
  };

  // ====================================
  //  PAGE: CLASSES (admin-classes.html)
  // ====================================
  const classesGrid = document.getElementById('classesGrid');
  const scheduleTableBody = document.getElementById('scheduleTableBody');

  function renderClasses() {
    if (!classesGrid) return;
    classesGrid.innerHTML = '';

    classes.forEach(c => {
      const card = document.createElement('div');
      card.className = 'class-admin-card glass-panel';
      const occupancyPct = Math.round((c.enrolled / c.capacity) * 100);
      const occColor = occupancyPct >= 90 ? 'var(--danger-color)' : occupancyPct >= 70 ? '#ffd700' : 'var(--success-color)';

      card.innerHTML = `
        <div class="class-admin-header">
          <span class="class-admin-emoji">${c.emoji}</span>
          <div class="class-admin-actions">
            <button class="action-btn delete" onclick="deleteClass('${c.id}')" title="Sil">🗑️</button>
          </div>
        </div>
        <h4>${c.name}</h4>
        <p class="class-admin-trainer">👤 ${c.trainer}</p>
        <div class="class-admin-details">
          <div class="class-detail-item">Gün <span>${c.day}</span></div>
          <div class="class-detail-item">Saat <span>${c.time}</span></div>
          <div class="class-detail-item">Süre <span>${c.duration} dk</span></div>
          <div class="class-detail-item">Doluluk <span style="color:${occColor}">${c.enrolled}/${c.capacity} (%${occupancyPct})</span></div>
        </div>
      `;
      classesGrid.appendChild(card);
    });
  }

  function renderScheduleTable() {
    if (!scheduleTableBody) return;
    scheduleTableBody.innerHTML = '';
    const dayOrder = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
    const sorted = [...classes].sort((a, b) => dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day));

    sorted.forEach(c => {
      const occupancyPct = Math.round((c.enrolled / c.capacity) * 100);
      const occColor = occupancyPct >= 90 ? 'var(--danger-color)' : occupancyPct >= 70 ? '#ffd700' : 'var(--success-color)';
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${c.day}</td>
        <td style="font-weight:500">${c.emoji} ${c.name}</td>
        <td>${c.trainer}</td>
        <td>${c.time}</td>
        <td>${c.duration} dk</td>
        <td style="color:${occColor}; font-weight:600">${c.enrolled}/${c.capacity} (%${occupancyPct})</td>
      `;
      scheduleTableBody.appendChild(tr);
    });
  }

  if (classesGrid) {
    renderClasses();
    renderScheduleTable();
  }

  document.getElementById('openAddClassModal')?.addEventListener('click', () => {
    document.getElementById('addClassModal')?.classList.add('show');
  });

  document.getElementById('addClassForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emojis = ['🏋️', '🧘', '🥊', '🚴', '💪', '🔥', '💃', '🤸'];
    const newClass = {
      id: 'c' + (classes.length + 1),
      name: document.getElementById('className').value,
      trainer: document.getElementById('classTrainer').value,
      day: document.getElementById('classDay').value,
      time: document.getElementById('classTime').value,
      duration: parseInt(document.getElementById('classDuration').value),
      capacity: parseInt(document.getElementById('classCapacity').value),
      enrolled: 0,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    };
    classes.push(newClass);
    renderClasses();
    renderScheduleTable();
    document.getElementById('addClassModal')?.classList.remove('show');
    e.target.reset();
    showToast(`"${newClass.name}" dersi eklendi!`);
  });

  window.deleteClass = (id) => {
    const cls = classes.find(c => c.id === id);
    if (confirm(`"${cls?.name}" dersini silmek istiyor musunuz?`)) {
      classes = classes.filter(c => c.id !== id);
      renderClasses();
      renderScheduleTable();
      showToast('Ders silindi', 'error');
    }
  };

  // ====================================
  //  PAGE: ANALYTICS (admin-analytics.html)
  // ====================================
  const revenueChart = document.getElementById('revenueChart');
  if (revenueChart) {
    const revenueData = [
      { label: 'Oca', value: 98 },
      { label: 'Şub', value: 105 },
      { label: 'Mar', value: 112 },
      { label: 'Nis', value: 128 },
    ];
    renderBarChart('revenueChart', revenueData);
  }

  // Plan Distribution Donut
  const planChart = document.getElementById('planChart');
  if (planChart) {
    const plans = [
      { name: 'Başlangıç', pct: 25, color: '#a855f7' },
      { name: 'Pro', pct: 45, color: '#00f0ff' },
      { name: 'Elite', pct: 30, color: '#00ff88' },
    ];

    let cumulativeOffset = 0;
    let svgCircles = '';
    plans.forEach(p => {
      svgCircles += `<circle cx="80" cy="80" r="60" fill="none" stroke="${p.color}" stroke-width="20"
        stroke-dasharray="${p.pct * 3.77} ${377 - p.pct * 3.77}"
        stroke-dashoffset="${-cumulativeOffset * 3.77}" stroke-linecap="round"/>`;
      cumulativeOffset += p.pct;
    });

    let legendHtml = '';
    plans.forEach(p => {
      legendHtml += `<div class="legend-item"><span class="legend-dot" style="background:${p.color}"></span>${p.name} - %${p.pct}</div>`;
    });

    planChart.innerHTML = `
      <svg class="donut-svg" viewBox="0 0 160 160">${svgCircles}</svg>
      <div class="donut-legend">${legendHtml}</div>
    `;
  }

  // Heatmap
  const heatmap = document.getElementById('heatmap');
  if (heatmap) {
    for (let h = 0; h < 24; h++) {
      let intensity;
      if (h >= 6 && h <= 9) intensity = 0.5 + Math.random() * 0.4;
      else if (h >= 17 && h <= 20) intensity = 0.7 + Math.random() * 0.3;
      else if (h >= 10 && h <= 16) intensity = 0.3 + Math.random() * 0.3;
      else intensity = Math.random() * 0.2;

      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.style.background = `rgba(0, 240, 255, ${Math.max(0.05, intensity)})`;
      cell.title = `${String(h).padStart(2, '0')}:00 - Yoğunluk: %${Math.round(intensity * 100)}`;
      heatmap.appendChild(cell);
    }

    const labels = document.createElement('div');
    labels.className = 'heatmap-labels';
    labels.innerHTML = '<span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>23:00</span>';
    heatmap.parentElement.appendChild(labels);
  }

  // ====================================
  //  PAGE: SETTINGS (admin-settings.html)
  // ====================================
  const settingsForms = ['gymInfoForm', 'hoursForm', 'pricingForm', 'securityForm'];
  settingsForms.forEach(formId => {
    const form = document.getElementById(formId);
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('Ayarlar başarıyla kaydedildi!');
      });
    }
  });

});
