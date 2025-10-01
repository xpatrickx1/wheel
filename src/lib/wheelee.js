(async () => {
  try {
    let widgetId;

    // Для локального тестування: Використовуємо window.wheeleeKey (id)
    if (window.wheeleeKey) {
      widgetId = window.wheeleeKey;
      console.log('widgetId wheeleeKey', widgetId)
    }
    // Для продакшену: Конвертуємо slug у id
    else if (window.wheeleeSlug) {
      console.log('widgetId wheeleeSlug', widgetId)
      const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";
      const response = await fetch(`${API_BASE}/functions/v1/get-widget-id/${window.wheeleeSlug}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const data = await response.json();
      console.log('get-widget-id data', data)
      if (!data.id) throw new Error("Widget ID not found");
      widgetId = data.id;
    } else {
      console.error("wheeleeKey or wheeleeSlug required");
      return;
    }

    const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";

    // Підвантажуємо налаштування за id
    // fetch(`${API_BASE}/functions/v1/get-widget/${widgetId}`)
    fetch(`https://ptulighepuqttsocdovp.supabase.co/functions/v1/get-widget/1540b0e1-87fe-440a-9bcb-e4aa8c212f51`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}: ${r.statusText}`);
        console.log('get-widget-id r', r)
        return r.json();
      })
      .then((widget) => {
        if (!widget || widget.error) throw new Error(widget.error || "Widget not found");
        console.log('get-widget-id widget', widget)
        createWheel({ ...widget.settings });
      })
      .catch((err) => console.error("Widget load error:", err));

    function createWheel(options) {
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
    
        const { bonuses, color, buttonText, collectData } = options;
        const baseColor = color || '#eb112a';
        const darkerColor = darkenColor(baseColor, 20);
        console.log('baseColor', buttonText)
        console.log('bonuses', bonuses)
        console.log('baseColor', document)
        // const container = document.getElementById(containerId) ? document.getElementById(containerId) : document.body;
        const container = document.body;
        console.log('container', container)
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
        canvas.width = 550;
        canvas.height = 550;
        wheelWrap.appendChild(canvas);
        wheelWrap.appendChild(wheelForm);
      
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        const center = canvas.width / 2;
        const radius = center - 10;

        console.log('bonuses', bonuses)
        const sliceAngle = (2 * Math.PI) / bonuses.length;
      
        if (!stylesAdded) {
            const styles = document.createElement('style');
            styles.id = 'widget-wheel-styles';
            styles.textContent = `
                .widget-wheel-wrap {
                    display: flex;
                    align-items: center;
                    gap: 20px;
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
                  animation: shake 0.12s ease-in-out 0s 2;
                  box-shadow: 0 0 0.5em #ff4949;
                  border: 1px solid #ff4949;
                  transition: opacity 0.4s ease, box-shadow 0.4s ease, border 0.4s ease;
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
          
          bonuses.forEach((prize, i) => {
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
            ctx.fillText(prize.text, textRadius + 40, 0);
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
            console.log('spin', bonuses)
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
                // alert("Випав приз: " + bonuses[winningIndex].text);
                indicatedSegment = bonuses[winningIndex].text;
                
                // Зберігаємо дані в базу
                try {
                  fetch(`${API_BASE}/save-result`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
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
  } catch (e) {
    console.error('widget init err', e);
  }
})();
