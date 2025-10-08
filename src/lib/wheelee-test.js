import { supabase } from './supabaseClient.js';

let stylesAdded = false;

// Функція для збереження даних у базу
async function saveResult(contact, prize) {
  const { data, error } = await supabase
    .from("widget_results")
    .insert([
      {
        // widget_id: id,
        // user_id: userId,
        contact: contact,
        prize: prize,
      }
    ]);

  if (error) {
    console.error("Помилка збереження:", error);
  } else {
    console.log("Результат збережено:", data);
  }
}

export default function createWheel(containerId, options) {
  console.log(containerId)
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

    const { bonuses, color, buttonText, collectData } = options;
    const baseColor = color || '#eb112a';
    const darkerColor = darkenColor(baseColor, 20);

    const container = document.getElementById(containerId) ? document.getElementById(containerId) : document.body;
    if (!container) return;
  
    const existingWheel = document.querySelector('.widget-wheel-wrap');
    if (existingWheel) {
        console.warn('Колесо вже існує на сторінці. Видаляю старе...');
        existingWheel.remove();
    }

    const wheelWrap = document.createElement("div");
    wheelWrap.className = "widget-wheel-wrap";
    container.appendChild(wheelWrap);
    wheelWrap.classList.add('_hidden');
    

    const existingOpenBtn = document.querySelector('.widget-open-btn');
    if (existingOpenBtn) {
        console.warn('Кнопка вже існує на сторінці. Видаляю старе...');
        existingOpenBtn.remove();
    }

    const openButton = document.createElement('div');
    openButton.className = 'widget-open-btn';
    openButton.textContent = 'Відкрити віджет';
    document.body.appendChild(openButton);

    openButton.addEventListener('click', () => {
      openButton.classList.add('_hidden');
      wheelWrap.classList.remove('_hidden');
      wheelWrap.classList.add('_active');
    });

    const closeButton = document.createElement('button');
    closeButton.className = 'widget-close-btn';
    closeButton.innerHTML = '✕'; 
    wheelWrap.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      wheelWrap.classList.remove('_active');
      openButton.classList.remove('_hidden');
      wheelWrap.classList.add('_hidden');
    });
        
        const wheelForm = document.createElement("div");
        wheelForm.className = "wheel-form";
        
        const canvas = document.createElement("canvas");
        canvas.width = 550;
        canvas.height = 550;
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
                    background: #212230;
                    position: fixed;
                    height: 100vh;
                    width: 70%;
                    left: 0;
                    top: 0;
                    transition: opacity 0.3s ease, transform 0.3s ease; 
                    opacity: 1;
                    transform: translateX(-100%);
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
                .widget-open-btn {
                  position: fixed;
                  bottom: 20px;
                  left: 20px;
                  padding: 10px 20px;
                  background-color: #ff9900;
                  color: #fff;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 16px;
                  z-index: 1000;
                  transition: background-color 0.3s ease;
                }
                .widget-open-btn:hover {
                    background-color: #e68a00;
                    transform: scale(1.05);
                }
                .widget-open-btn._hidden {
                  display: none;
                }
                .widget-wheel-wrap canvas {
                  position: absolute;
                  left: -275px;
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
            `;
            document.head.appendChild(styles);
            stylesAdded = true;
        }
  
    let rotation = 0;
    let spinning = false;
    let indicatedSegment = null;
    let inputValue = "";
    let isPolicyAccepted = false;
    let isInputValid = false;
  
    
    function drawWheel() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      bonuses.forEach((bonus, i) => {
        const startAngle = i * sliceAngle + rotation;
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
        ctx.fillStyle = "#000";
        ctx.font = "16px Arial";
        ctx.fillText(bonus.text, textRadius + 40, 0);
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
      
        const targetIndex = Math.floor(Math.random() * bonuses.length);
        const randomOffset = (Math.random() - 0.5) * sliceAngle * 0.8;
      
        const targetAngle =
          2 * Math.PI * 5 +
          (targetIndex * sliceAngle + sliceAngle / 2) +
          randomOffset;
      
        const duration = 5000;
        const start = performance.now();
        const initialRotation = rotation;
      
        function easeInOutCubic(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function easeInOutShifted(t, bias = 0.4) {
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
            // alert("Випав приз: " + prizes[winningIndex].text);
            indicatedSegment = bonuses[winningIndex].text;
            
            // Зберігаємо дані в базу
            saveResult(inputValue, indicatedSegment);
            
            render()
          }
        }
      
        requestAnimationFrame(animate);
        // indicatedSegment = "Подарунок 🎁";
        //     render();
    }
  
    // btn.addEventListener("click", spin);

    
  
    function render() {
        wheelForm.innerHTML = "";
    
        if (!indicatedSegment) {
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
        input.value = inputValue;
        input.type = collectData === "email" ? "email" : "tel";
        input.placeholder = collectData === "email" ? "Enter your email" : "Enter your phone";
        input.className = "form-input";
        input.addEventListener("input", e => inputValue = e.target.value);
        divInput.appendChild(input);

        // Валідація
        function validateInput() {

          if (collectData === "email") {
            console.log("email");
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              isInputValid = emailRegex.test(input.value.trim());
          } else if (collectData === "tel") {
            console.log("tel");
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
            box.classList.add("error");

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
          btn.className = "widget-wheel-spin-btn";
          btn.style.backgroundColor = options.color;
          btn.addEventListener("click", () => {
            if (!isPolicyAccepted || !validateInput()) {
              validatePolicy()
              validateInput()
              return;
            }
            spin();
          });
    
          form.appendChild(divInput);
          form.appendChild(divCheckWrap);
          form.appendChild(btn);
    
          wrap.appendChild(form);
          wheelForm.appendChild(wrap);
        } else {
          // Екран з результатом
          const wrap = document.createElement("div");
    
          const prizeText = document.createElement("div");
          prizeText.className = "widget-prize-title";
          prizeText.textContent = indicatedSegment;
    
          const msg = document.createElement("div");
          msg.className = "widget-prize-text";
          msg.textContent = options.successMessage;
    
          wrap.appendChild(prizeText);
          wrap.appendChild(msg);
          wheelWrap.appendChild(wrap);
        }
    }
    render();
    drawWheel();
  }
  