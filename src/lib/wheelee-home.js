
  export default  function createWheel(containerId, options) {
    const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";
    let widgetId;

    let stylesAdded = false;
      function hexToRgb(hex) {
          const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
          return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          } : { r: 0, g: 0, b: 0 };
      }
        
      function rgbToHex(r, g, b) {
          return "#" + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
      }
      
      function darkenColor(hex, percent) {
          const rgb = hexToRgb(hex);
          const factor = 1 - percent / 100;
          const r = Math.round(rgb.r * factor);
          const g = Math.round(rgb.g * factor);
          const b = Math.round(rgb.b * factor);
          return rgbToHex(r, g, b);
      }

      function getContrastTextColor(bgColor) {
        let r, g, b;
      
        // Якщо формат rgb(...)
        if (bgColor.startsWith('rgb')) {
          const rgb = bgColor.match(/\d+/g).map(Number);
          [r, g, b] = rgb;
        } 
        // Якщо формат HEX (#RRGGBB або #RGB)
        else {
          let hex = bgColor.replace('#', '');
          if (hex.length === 3) {
            hex = hex.split('').map(c => c + c).join('');
          }
          const bigint = parseInt(hex, 16);
          r = (bigint >> 16) & 255;
          g = (bigint >> 8) & 255;
          b = bigint & 255;
        }
      
        const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
        // Поріг можна трохи регулювати: 128 — універсальний, 150 — для темних кольорів
        return brightness > 150 ? '#000000' : '#ffffff';
      }
  
      const { bonuses, color, buttonText, collectData } = options;
      const baseColor = color || '#eb112a';
      const darkerColor = darkenColor(baseColor, 20);
      const container = document.getElementById("wheelee-container") ? document.getElementById("wheelee-container") : document.body;
      // const container = document.body;
      if (!container) return;
    
      const existingWheel = document.querySelector('.widget-wheel-wrap');
      if (existingWheel) {
          console.warn('Колесо вже існує на сторінці. Видаляю старе...');
          existingWheel.remove();
      }
  
      const wheelWrap = document.createElement("div");
      wheelWrap.className = "widget-wheel-wrap";
      container.appendChild(wheelWrap);
      
      const wheelForm = document.createElement("div");
      wheelForm.className = "wheel-form";
      
      const canvas = document.createElement("canvas");

      // let size = screenWidth <= 550 ? screenWidth : 550;

      const openButton = document.createElement('div');
        openButton.className = 'widget-open-btn';
        document.body.appendChild(openButton);

        openButton.addEventListener('click', () => {
          openButton.classList.add('_hidden');
          wheelWrap.classList.remove('_hidden');
          wheelWrap.classList.add('_active');
        });
        const openDelay = options.autoOpenDelay * 1000
        setTimeout(() => {
          wheelWrap.classList.remove('_hidden');
          wheelWrap.classList.add('_active');
        }, openDelay || 10000);

      function updateScreenWidth() {
        const screenWidth = window.innerWidth;
        console.log("Current width:", screenWidth);
      
        // приклад: адаптивна логіка
          size = screenWidth <= 550 ? screenWidth : 550;
          canvas.width = size;
          canvas.height = size;
          console.log(size)
          drawWheel()
      }
      
      
      const maxSize = 550;
      const screenWidth = window.innerWidth;
      let size = Math.min(screenWidth, maxSize);
      canvas.width = size;
      canvas.height = size;
      
      wheelWrap.appendChild(canvas);
      wheelWrap.appendChild(wheelForm);
    
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      const center = canvas.width / 2;
      const radius = center - 10;

      const activeBonuses = bonuses.filter(bonus => bonus.is_participating === true);
      const sliceAngle = (2 * Math.PI) / activeBonuses.length;

      

      if (!stylesAdded) {
          const styles = document.createElement('style');
          styles.id = 'widget-wheel-styles';
          styles.textContent = `
              .widget-wheel-wrap {
                  display: flex;
                  align-items: center;
                  gap: 20px;
                  position: relative;
                  height: 100vh;
                  width: 100%;
                  left: 0;
                  top: 0;
                  transition: opacity 0.3s ease, transform 0.3s ease; 
                  opacity: 1;
                  transform: translateX(0);
              }
               .widget-wheel-wrap._hidden {
                opacity: 0; 
                transform: translateX(-100%);
              }
              .widget-wheel-wrap._active {
                  display: flex;
                  opacity: 1;
                  transform: translateX(0);
              }

              .widget-wheel-wrap canvas {
                position: absolute;
                left: -275px;
              }
              
              .widget-open-btn:hover {
                  background-color: #e68a00;
                  transform: scale(1.05);
              }
              .widget-open-btn._hidden {
                display: none;
              }
              .widget-close-btn {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 30px;
                height: 30px;
                background-color: transparent; 
                border: none;
                color: #fff;
                font-size: 20px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
                transition: background-color 0.3s ease, transform 0.3s ease;
                z-index: 1001;
              }
              .widget-close-btn:hover {
                transform: rotate(90deg); 
              }
              .widget-wheel-spin-btn {
                  display: block;
                  padding: 15px 30px;
                  color: white;
                  border: none;
                  white-space: nowrap;
                  font-size: 18px;
                  cursor: pointer;
                  transition: background 0.3s;
                  position: relative;
                  z-index: 200;
                  margin-top: 1rem;
                  border-radius: 0.375rem;
                  color: white;
                  font-weight: bold;
                  padding: 1rem 2rem;
              }
  
              .widget-wheel-spin-btn:hover {
                  transform: scale(1.05);
              }
  
              .widget-wheel-spin-btn:disabled {
                  background: #ccc;
                  cursor: not-allowed;
                  transform: none;
              }
  
              .checkbox-box {
                  width: 26px;            
                  height: 26px;           
                  min-width: 26px;        
                  border-radius: 5px;     
                  margin-right: 0.5rem;   
                  border: 1px solid rgba(255,255,255,.2);
                  transition: opacity 0.4s ease, box-shadow 0.4s ease, border 0.4s ease;
              }
  
              .form-wrap {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  max-width: 400px;
              }
              .wheel-form-home {
                position: absolute;
                left: 325px;
              }
              .form-title {
                  font-size: 24px;
                  font-weight: bold;
              }
  
              .form-subtitle {
                  font-size: 18px;
                  margin-top: 4px;
                  margin-top: 20px;
              }
  
              .form {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                  margin-top: 20px;
              }
  
              .sr-only {
                  position: absolute;
                  width: 1px;
                  height: 1px;
                  padding: 0;
                  margin: -1px;
                  overflow: hidden;
                  clip: rect(0, 0, 0, 0);
                  white-space: nowrap;
                  border-width: 0;
              }
              .input-wrap {
                  width: 100%;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
              }
  
              .form-input {
                  width: 100%;
                  max-width: 100%;
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  outline: none;
                  background-color: transparent;
                  color: white;
                  height: 60px;
                  border-radius: 10px;
                  padding-left: 60px;
                  transition: opacity 0.4s ease, box-shadow 0.4s ease, border 0.4s ease;
              }
  
              .checkbox-wrap {
                  width: 100%;
                  display: flex;
                  align-items: flex-start;
                   margin-top: 20px;
              }
  
              .form-label {
                  position: relative;
                  cursor: pointer;
                  display: inline-flex;
                  align-items: center;
              }
  
             .checked {
                  background-repeat: no-repeat;
                  background-position: center;
                  background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+IDxwYXRoIGQ9Ik0xMS40IDVMMTAgMy42bC00IDQtMi0yTDIuNiA3IDYgMTAuNHoiIGZpbGw9IiNGRkYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==);
              }
  
              .policy-text {
                  font-size: 12px;
                  line-height: 16px;
              }
  
              .widget-prize-title {
                  font-size: 46px;
                  line-height: 50px;
                  color: white;
                  font-weight: bold;
              }
  
              .widget-prize-text {
                  font-size: 18px;
                  line-height: 22px;
                  margin-top: 20px;
                  color: white;
              }
  
              .checkbox-box.error {
                animation: shake 0.12s ease-in-out 0.1s 2;
                box-shadow: 0 0 0.5em #ff4949;
                border: 1px solid #ff4949;
                transition: opacity 0.4s ease 0.1s, box-shadow 0.4s ease 0.1s, border 0.4s ease 0.1s;
                opacity: 1;
              }

              input.error {
                animation: shake 0.12s ease-in-out 0s 2;
                box-shadow: 0 0 0.5em #ff4949;
                border: 1px solid #ff4949;
                transition: opacity 0.4s ease, box-shadow 0.4s ease, border 0.4s ease;
                opacity: 1;
              }
  
              @keyframes shake {
                0% { transform: translateX(0); }
                25% { transform: translateX(4px); }
                75% { transform: translateX(-4px); }
                100% { transform: translateX(0); }
              }

              .wheel-spin-loader {
                margin: 0 auto;
              }

              .dot {
                  width: 1em;
                  height: 1em;
                  border-radius: 0.5em;
                  background: #fff;
                  position: absolute;
                  animation-duration: 0.5s;
                  animation-timing-function: ease;
                  animation-iteration-count: infinite;
              }

              .dot1, .dot2 {
                left: 0;
              }

              .dot3 { left: 1.5em; }

              .dot4 { left: 3em; }

              @keyframes reveal {
                from { transform: scale(0.001); }
                to { transform: scale(1); }
              }

              @keyframes slide {
                to { transform: translateX(1.5em) }
              }

              .dot1 {
                animation-name: reveal;
              }

              .dot2, .dot3 {
                animation-name: slide;
              }

              .dot4 {
                animation-name: reveal;
                animation-direction: reverse;
              }

              @media (max-width: 767px) {
                .widget-wheel-wrap {
                  flex-direction: column;
                }

                #wheelee-container canvas {
                  position: absolute;
                  top: -${size / 2}px;
                  left: 50%;
                  transform: translateX(-50%) rotate(90deg) scale(0.7);
                  left: 50%;
                }

                .wheel-form {
                  left: 50%;
                  top: ${size / 2 + 80}px;
                  transform: translateX(-50%);
                  width: 90%;
                  max-width: 400px;
                }

              }

              .widget-open-btn {
                  position: fixed;
                  z-index: 999997;
                  width: 100px;
                  height: 100px;
                  cursor: pointer;
                  left: 10px;
                  bottom: -30px;
                  background: url(https://ptulighepuqttsocdovp.supabase.co/storage/v1/object/public/wheelee/gift.png) center center no-repeat;
                  background-size: contain;
                  transform-origin: right bottom;
                  outline: 0;
                  animation: shakeBox 0.12s infinity 0s 2;
                }

                @keyframes shakeBox {
                  0% {
                      transform: rotate(0deg);
                  }
                  50% {
                      transform: rotate(-6deg);
                  }
                  100% {
                      transform: rotate(0deg);
                  }
                }
          `;
          document.head.appendChild(styles);
          stylesAdded = true;
      }
    
      let rotation = 0;
      let spinning = false;
      let prize = null;
      let contact = "";
      let isPolicyAccepted = false;
      let isInputValid = false;
      let idleRotation = 0;
      let idleAnimationId = null;
    
      function startIdleRotation(speed = 0.002) {
        if (idleAnimationId) return;
      
        function animateIdle() {
          if (spinning) {
            idleAnimationId = null;
            return;
          }
          rotation += speed;
          if (Math.abs(rotation) > 1e6) rotation = rotation % TWO_PI;
          drawWheel();
          idleAnimationId = requestAnimationFrame(animateIdle);
        }
      
        idleAnimationId = requestAnimationFrame(animateIdle);
      }
      
      function stopIdleRotation() {
        if (idleAnimationId) {
          cancelAnimationFrame(idleAnimationId);
          idleAnimationId = null;
        }
      }


      // 🔹 Функція для переносу рядків
      function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        const lines = [];

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
            lines.push(line.trim());
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
        lines.push(line.trim());

        // Малюємо кожен рядок
        const totalHeight = lines.length * lineHeight;
        const offsetY = -(totalHeight / 2) + lineHeight / 2;

        lines.forEach((l, i) => {
          ctx.fillText(l, x + 40, y + offsetY + i * lineHeight);
        });
      }

      function drawWheel() {
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        activeBonuses.forEach((prize, i) => {
          const startAngle = i * sliceAngle + rotation + idleRotation;
          const endAngle = startAngle + sliceAngle;
          ctx.shadowColor = "rgba(0,0,0,0.2)";
          ctx.shadowBlur = 8;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 2;
          // Сектор
          ctx.save();
          ctx.shadowColor = "transparent";
          ctx.beginPath();
          ctx.moveTo(center, center);
          ctx.arc(center, center, radius, startAngle, endAngle);
          ctx.fillStyle = i % 2 === 0 ? baseColor : darkerColor;
          ctx.fill();
    
          // Текст
          ctx.save();
          ctx.translate(center, center);
          ctx.rotate(startAngle + sliceAngle / 2);
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          const textRadius = radius / 2;
          ctx.fillStyle = getContrastTextColor(baseColor);
          ctx.font = "16px Arial";
          const maxWidth = 165;
          const lineHeight = 26;
          const text = prize.value;
          wrapText(ctx, text, textRadius, 0, maxWidth, lineHeight);
          ctx.restore();
        });
    
        // Коло в центрі
        ctx.save();
        ctx.shadowColor = "rgba(0,0,0,0.2)"; 
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        ctx.arc(center, center, 60, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.restore();
        // Стрілка
        ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = -3;
        ctx.shadowOffsetY = 3;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.moveTo(center + radius + 7, center - 15);   
        ctx.lineTo(center + radius + 7, center + 15);   
        ctx.lineTo(center + radius - 35, center);      
        ctx.closePath();
        ctx.fill();
      }
    
      function spin() {
          if (spinning) return;
          spinning = true;
          stopIdleRotation();
          const targetIndex = Math.floor(Math.random() * activeBonuses.length);
          const randomOffset = (Math.random() - 0.5) * sliceAngle * 0.8;
        
          const targetAngle =
            2 * Math.PI * 5 +
            (targetIndex * sliceAngle + sliceAngle / 2) +
            randomOffset;
        
          const duration = 500000;
          const start = performance.now();
          const initialRotation = rotation;
        
          function easeInOutCubic(t) {
              return 1 - Math.pow(1 - t, 3);
          }
  
          function easeInOutShifted(t, bias = 0.3) {
              // bias < 0.5 = швидше набирає, довше гальмує
              if (t < bias) {
                return Math.pow(t / bias, 2); // швидкий розгін
              } else {
              //   return 1 - Math.pow((1 - t) / (1 - bias), 2); // плавне гальмування
                return 1 - Math.pow(1 - t, 3);
              }
            }
            
        
          function animate(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
        
            const ease = easeInOutShifted(progress);
            rotation = initialRotation + ease * targetAngle;
        
            drawWheel();
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              spinning = false;
              const normalized = (rotation % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
              const winningIndex = Math.floor(((2 * Math.PI - normalized) % (2 * Math.PI)) / sliceAngle);
              prize = activeBonuses[winningIndex].value;
              
              try {
                fetch(`${API_BASE}/functions/v1/save-result`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json'},
                  body: JSON.stringify({ widget_id: widgetId, contact, prize })
                });
              } catch (e) {
                console.error('save result err', e);
              }

              render()
            }
          }
        
          requestAnimationFrame(animate);
      }
    
    
      function render() {
          wheelForm.innerHTML = "";
          if (spinning) {
            const loader = document.createElement("div");
            loader.className = "wheel-spin-loader";
            loader.innerHTML = `
              <div class="dot dot1"></div>
              <div class="dot dot2"></div>
              <div class="dot dot3"></div>
              <div class="dot dot4"></div>
            `;
            wheelForm.appendChild(loader);
          } 
      
          if (!spinning) {
            if (!prize) {
              // Форма
              const wrap = document.createElement("div");
              wrap.className = "form-wrap";
        
              if (options.title) {
                const title = document.createElement("div");
                title.className = "form-title";
                title.textContent = options.title;
                wrap.appendChild(title);
              }
        
              if (options.subtitle) {
                const p = document.createElement("p");
                p.className = "form-subtitle";
                p.textContent = options.subtitle;
                wrap.appendChild(p);
              }
        
              const form = document.createElement("form");
              form.className = "form";
              form.addEventListener("submit", e => e.preventDefault());
        
              // email input
              const divInput = document.createElement("div");
              divInput.className = "input-wrap";
    
              const input = document.createElement("input");
              input.value = contact;
              input.type = collectData === "email" ? "email" : "tel";
              input.placeholder = collectData === "email" ? "Enter your email" : "Enter your phone";
              input.className = "form-input";
              input.addEventListener("input", e => contact = e.target.value);
              divInput.appendChild(input);
    
            // Валідація
              function validateInput() {
      
                if (collectData === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    isInputValid = emailRegex.test(input.value.trim());
                } else if (collectData === "tel") {
                    const telRegex = /^\+?[0-9]{7,15}$/; // телефон з 7–15 цифр, опціонально з "+"
                    isInputValid = telRegex.test(input.value.trim());
                }
      
                
                if (!isInputValid) {
                    input.classList.add("error");
      
                    setTimeout(() => {
                    input.classList.remove("error");
                    }, 1000);
                }
      
                return isInputValid;
              }
    
              function validatePolicy() {
                if (!isPolicyAccepted) {
                  setTimeout(() => {
                    box.classList.add("error");
                  }, 200);
                  setTimeout(() => {
                    box.classList.remove("error");
                  }, 1000);
                }
      
                return isPolicyAccepted;
              }
    
              input.addEventListener("blur", validateInput);
        
              // чекбокс
              const divCheckWrap = document.createElement("div");
              divCheckWrap.className = "checkbox-wrap";
        
              const divCheck = document.createElement("div");
        
              const label = document.createElement("label");
              label.className = "form-label";
        
              const checkbox = document.createElement("input");
              checkbox.type = "checkbox";
              checkbox.className = "sr-only peer";
              checkbox.addEventListener("change", () => {
                isPolicyAccepted = checkbox.checked;
                if (isPolicyAccepted) {
                    box.classList.add("checked");
                }
                render();
              });
        
              const box = document.createElement("div");
              box.className = "checkbox-box";
              if (isPolicyAccepted) {
                box.classList.add("checked");
              }
              checkbox.checked = isPolicyAccepted;
    
              label.appendChild(checkbox);
              label.appendChild(box);
              divCheck.appendChild(label);
        
              const policyText = document.createElement("div");
              policyText.className = "policy-text";
              policyText.innerHTML = `Я даю своё <a href="#" class="" target="_blank">Cогласие</a> на обработку персональных данных и подтверждаю ознакомление с <a href="${options.privacyUrl}" class="" target="_blank">Политикой</a> обработки персональных данных`;
        
              divCheckWrap.appendChild(divCheck);
              divCheckWrap.appendChild(policyText);
        
              // кнопка
              const btn = document.createElement("button");
              btn.id = "spin_button";
              btn.textContent = buttonText;
              btn.style = `color: ${getContrastTextColor(baseColor)}`
              btn.className = "widget-wheel-spin-btn";
              btn.style.backgroundColor = options.color;
              btn.addEventListener("click", () => {
                if (!isPolicyAccepted || !validateInput()) {
                  validatePolicy()
                  validateInput()
                  return;
                }
                spin();
                render();
              });
        
              form.appendChild(divInput);
              form.appendChild(divCheckWrap);
              form.appendChild(btn);
        
              wrap.appendChild(form);
              wheelForm.appendChild(wrap);
            } else {
              // Екран з результатом
              const prizeText = document.createElement("div");
              prizeText.className = "widget-prize-title";
              prizeText.textContent = prize;
        
              const msg = document.createElement("div");
              msg.className = "widget-prize-text";
              msg.textContent = options.successMessage;
        
              wheelForm.appendChild(prizeText);
              wheelForm.appendChild(msg);
            }
          }
         
      }

      render();
      drawWheel();
      startIdleRotation();
  }
