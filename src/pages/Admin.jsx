import React from 'react';
import '../styles/Home.css';
import '../styles/Admin.css';

const Admin = () => {
  return (
     <div className="container">
      <nav className="sidebar">
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>
        <ul className="nav-list">
          <li><a href="#dashboard">Табло</a></li>
          <li><a href="#users">Потребители</a></li>
          <li><a href="#products">Продукти</a></li>
          <li><a href="#suppliers">Доставчици</a></li>
          <li><a href="#stats">Статистика</a></li>
        </ul>
      </nav>

      <main className="admin-content">
        <header className="admin-header">
          <h1>Админ панел</h1>
          <div className="profile-section">
            <img src={profileImg} alt="Admin" className="profile-img" />
            <span className="admin-name">Администратор</span>
          </div>
        </header>

        <section id="dashboard">
          <h2>Табло</h2>
          {/* Тук можеш да покажеш overview, продажби и т.н. */}
        </section>

        <section id="users">
          <h2>Потребители</h2>
          {/* Таблица или списък с потребители */}
        </section>

        <section id="products">
          <h2>Продукти</h2>
          {/* Форма за добавяне/редактиране на продукти */}
        </section>

        <section id="suppliers">
          <h2>Доставчици</h2>
          {/* Данни за доставчици */}
        </section>

        <section id="stats">
          <h2>Статистика</h2>
          {/* Графики, данни и др. */}
        </section>
      </main>
    </div>
  );
};

export default Admin;
