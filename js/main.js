
document.addEventListener('DOMContentLoaded', () => {

  const cfgPath = 'data/config.json';

  fetch(cfgPath)
    .then(res => {
      if (!res.ok) throw new Error('Fetch error ' + res.status);
      return res.json();
    })
    .then(data => {

      // --- safe default values ---
      const defaults = {
        businessName: 'Your Business',
        tagline: '',
        description: '',
        phone: '',
        email: '',
        location: '',
        instagram: '',
        themeColor: '#d4a785',
        gallery: []
      };
      data = Object.assign({}, defaults, data);

      // Setting Meta/Title
      if (data.businessName) {
        document.title = data.businessName;
        document.querySelectorAll('.business-name').forEach(el => el.textContent = data.businessName);
      }

      // Text
      document.querySelectorAll('.tagline').forEach(el => el.textContent = data.tagline || '');
      document.querySelectorAll('.description').forEach(el => el.textContent = data.description || '');
      document.querySelectorAll('.phone').forEach(el => el.textContent = data.phone || '');
      document.querySelectorAll('.whatsapp').forEach(el => el.textContent = data.whatsApp || '');
      document.querySelectorAll('.email').forEach(el => el.textContent = data.email || '');
      document.querySelectorAll('.location').forEach(el => el.textContent = data.location || '');
      document.querySelectorAll('.instagram').forEach(el => el.textContent = data.instagram || '');
      document.querySelectorAll('.about_description').forEach(el => el.textContent = data.descriptionAbout || '');

      document.querySelector('.phone').textContent = `${data.phoneIcon} ${data.phone}`;
      document.querySelector('.phone').href = `tel:${data.phone.replace(/\s/g, '')}`;

      document.querySelector('.email').textContent = `${data.emailIcon} ${data.email}`;
      document.querySelector('.email').href = `mailto:${data.email}`;

      document.querySelector('.whatsapp').textContent = `${data.whatsappIcon} WhatsApp`;
      document.querySelector('.whatsapp').href = `https://wa.me/${data.phone.replace(/\D/g, '')}`;

      document.querySelector('.instagram').textContent = `${data.instagramIcon} ${data.instagram}`;
      document.querySelector('.instagram').href = `https://instagram.com/${data.instagram.replace('@', '')}`;

      // Colors
      if (data.themeColor) {
        document.documentElement.style.setProperty('--body-color', data.bodyColor);
        document.documentElement.style.setProperty('--theme-color', data.themeColor);
        document.documentElement.style.setProperty('--text-color', data.textColor);
      }

      // Services
      const servicesList = document.querySelector('.services');
      if (servicesList && Array.isArray(data.services)) {
        data.services.forEach(service => {
          const li = document.createElement('li');
          li.textContent = service;
          servicesList.appendChild(li);
        });
      }

      // Gallery: clearing and filling
      const galleryContainer = document.querySelector('.gallery-grid');
      if (galleryContainer) {
        galleryContainer.innerHTML = '';
        if (Array.isArray(data.gallery)) {
          data.gallery.forEach(item => {
            const link = document.createElement('a');
            link.href = item.src || '#';
            link.setAttribute('data-fancybox', 'gallery');

            const img = document.createElement('img');
            img.src = item.src || '';

            link.appendChild(img);
            galleryContainer.appendChild(link);
          });
        }
      }
    })
    .catch(err => {
      console.error('Error config.json:', err);
    });
});


/****************************************************************************** */
// Burger

document.querySelector('.burger').addEventListener('click', function(){
  this.classList.toggle('active');
  document.querySelector('.menu_items').classList.toggle('open');
});

// Close on click of link
document.querySelectorAll('.menu_items').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.menu_items').classList.remove('open');
    document.querySelector('.burger').classList.remove('active');
  });
});

/*************************************************************************** */

//Text printing effect

function typeText(element, text, speed = 80, delay = 0) {
  element.textContent = "";
  element.style.opacity = "1";
  let i = 0;

  setTimeout(() => {
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }, delay);
}

document.addEventListener('DOMContentLoaded', () => {
  const taglineEl = document.querySelector('.tagline');
  const descEl = document.querySelector('.description');

  // So that the text is not visible before the start
  taglineEl.style.opacity = "0";
  descEl.style.opacity = "0";

  setTimeout(() => {
    if (taglineEl && descEl) {
      const taglineText = taglineEl.textContent.trim();
      const descText = descEl.textContent.trim();

      // Let's start the animation: first the title, then the description
      typeText(taglineEl, taglineText, 90, 300); // 0.3с pause
      typeText(descEl, descText, 70, taglineText.length * 90 + 1000);
    }
  }, 1000);
});

//Gallery catalog

document.addEventListener('DOMContentLoaded', () => {
  
  const galleryImages = [
  ];

  const galleryContainer = document.querySelector('.gallery-grid');

  galleryImages.forEach(item => {

    // Create an <a> with fancybox
    const link = document.createElement('a');
    link.href = item.src;
    link.setAttribute('data-fancybox', 'gallery');
    link.setAttribute('data-caption', item.caption);

    // create <img> inside
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;

    link.appendChild(img);
    galleryContainer.appendChild(link);
  });

    // Initializing Fancybox
  Fancybox.bind("[data-fancybox='gallery']", {
    animated: true,
    showClass: "f-fadeIn",
    hideClass: "f-fadeOut",
    Thumbs: false,
    Toolbar: {
      display: [
        { id: "counter", position: "center" },
        "zoom",
        "slideshow",
        "fullscreen",
        "close"
      ]
    },
  });
});



