
export default  function createWheel( options, widgetId ) {
  const API_BASE = "https://ptulighepuqttsocdovp.supabase.co";

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

  const { bonuses, color, buttonText, collectData, showOpenButton = true  } = options;
  const baseColor = color || '#eb112a';
  const darkerColor = darkenColor(baseColor, 20);
  const container = document.getElementById('wheelee-container') || document.body;
  if (!container) return;

  const existingWheel = document.querySelector('.widget-wheel-wrap');
  if (existingWheel) {
      existingWheel.remove();
  }

  const wheelWrap = document.createElement("div");
  wheelWrap.className = "widget-wheel-wrap";
  container.appendChild(wheelWrap);
  
  const wheelForm = document.createElement("div");
  wheelForm.className = "wheel-form";
  
  const canvas = document.createElement("canvas");

  const openButton = document.createElement('div');
  openButton.className = 'widget-open-btn';

  if (showOpenButton) {
    
    const img = new Image();
    img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAK4AAADICAMAAABGfyqbAAAC/VBMVEUAAAC/v7/iFROysbGmpaXlDw6mqangCgrPz8/Q0NDDx8ff3t6pqKjOCAenqanwammxs7OlpaXYUU2pqanS0tK6Dwy2BgSmpqb+BQK6v7/4BQH0FBS4Z2X+/v7oEg/De3jRPjn/AQH+/v78Liy5ubnVCQbrQD7+BAL8/Pz9/f38IiDmBwL////WEw/uAwH3BQPAAwD7+/v5+fn9/f3+/v67u7vIyMjHx8fdDgbMDQn7+/v3eHn+//+vAQD/b3KzEwmAxMS8vLzf39/3+Pjt7e319fX/AQDl5eXj4+Ph4eH/CADBwcHn5+fExMTf39/Y2Njr6+vp6end3d3t7e3b29u9vb3v7+/9AAD3AADW1dXzAAD6AADT09O7urrR0dHa2tr/DgHOzs7vAAD/HAD/FQHIyMjsAAC3t7e0tLTLy8v/GBHoAQD09fXgAADkAAD/DwuioqLx8fHTAQD/Bwja///bAQDXAQD/Uk/OAQD/cW2np6f/a2f/dnH/WVTIAQD/X1v9/f34+Pj/REHCAAD/NTTn///+PDv/LS7/HyH/IBi7AAD/ZWH+JiXGwcGBAAD/LSX/j4z/GBn/IwH/SkWvr6+qqqqsAAC0AAD/NCqJAADv//+y5OX/T0mQAAD/KBz/KgOxsbGfAACYAAD/PDHO/v+029y309OtrKz/hYLDvr7/Qzr/DhalAQG8zc7/gX3+e3et4OGcmpn/iofl39/2///1Lif/NAai2drsOza16erXfnrl9fXsSEL/PSHzEQWmzs/abmrnU03C8fPe7Oy2xcbIlpThYV7S8vTSjox1AACVzM2pxMX9mJXS4+TKpKGNkI9iAQH1urrpendPAADkt7XDtrR4sLL+UDLgp6XsiYYvAADE2dqUs7S3sbH0p6fyHBbdxcOPwMGlsbHjzcyRpabpnJn0W1bfLCb03dzFraudX1z/SAb2zMx4nZ2ni4nCU1HkFAyWeHayMC7+YzjEFQ+fvr6SPTikuLi0oqB1gYFwZWJGnJuMGxkeYGD/fktES8QfAAAARnRSTlMAFg8oakiLJKd3VD89N7796KX92NKRW1PJoZVf/HRv/v7tIs3HpLavqJyKfU706drZ4NizinrhzsvDwoDIrjX58vLht5G8IeigsQAAJqlJREFUeNrU2VvoDFEcB/Cl5EFSiuSWS+73y4NbXuTEJHfmmJHWsYZmzCyrmd21uxbjtksWq70UK7a0Fru1LnlxiSSlvLmU8qJISIjw4vc7M6zcrQfjm1v6Zz//3/7O7/x2+P5hpk6ePLlHu7a+/yFTJ3eq3awd3MdGDuro83qmDswUko2b0a1Elklfn8czdDcJZON798a2r6dUJO18Xk77/kFCCsn63kZse5BKMunu83Da7SaEqFt21YC7RaVM8nQ39FZBK2QOxoAbze6kCpNJD59X0z0oYHHL4VhlbyMe3i0rikQG+TyaQQJqSaqaiFb27q0ndqxXNCaS9j4vpm03wrVCyeUmtweZoUlkqM+DaT+KOPFntiSRW0tu3ycZBhNH+byXdn2JGzWTdbi7tuyUDF2TifdutmHkc9SCy41ld1NDN5j3Rm/3plb4xK3EDu4IKoahiH29tem070a+x42Gt6rMMDTqrdELbft9bgLOmmbALOvm806GEvINN15p7K3EE9t3yoqhKbJ3Rm/bQY5S/IJ7cBdyG/Hklt3rmaYpkmcOm9u2uNm68cMt4XDryeyOoARc5pXD1k51tZL8SZvamk3E4jXk7jq4dR9VNM0re05vV0sllysEUoXqQZdbi4W37xSdbvDCYRvqaEXKmCQ6pS0VylsOJnZFgQv3RGL7bt4NnthzBn7WKpwrqIAtl6vZcDJab/BJtmXHCaqAl5Levn+btv3dTpCwO0EbTGVQW96+JZyM1XHwxpPZrftk5Er/dvQ2tSJcBDpog2opU8BsLfPm5Vw4azv5KGP/ds9BreBqdV0i69VUKeOmUM4mduFZq9R3hbF5eTf829H7Sctg5aLrVbSWUhhgw2zAbqjU4sDNqCJ4cfT6/l1Qi2GGacjBFMeqajDoDwSAXkZvNB6PJbMFdT2RGKPkXz5wGPiFFtbxQiaTUoPOJx/Bj02M/Zs4WC1dNO38SUg+0ko3tB8wcUCX3l3bdWzf9q/mrauVdEsTUoVCpsSxboRgqoRRdfvkoWJxT/EQpHhU7/vnVRmh64ZhQCuNHNVt0KChvXu0Au+d+qw1uDblYJtgvyCa6aOu9CjkyJGjReWPu6Hz2RV+gRD3XQtgLo4cNWFA995dO7b/7T3hk9ZALZZ2PSGiE1kWCcRIH+HWpvbIyaMnh/1xdTNqwC+48QdT/Ba6AKfET5kxYsKAYT1+3Sdtzzpaali6kOJYkUqSRCn+SgjR7CN7buwpQhDsYk/m8rkuf8wtrWhqgbtjSyKZTISz1QK8KlV0jDGy26Bh7X4yFNZ/1opqCfqAMhysGCYSFjkJVgxqEcutuXzajnT8Y+6DAECJ61V3bg/vikZju5LhLVsz+wS4nyD40ox26/GDIvcIcq1sWKYcgHkg4zeJB0JXqGTmizdcLK/skc/WjRF9gO/Puc3WBS48v4jXavVoLHlw+459UF5F0SAoZmzksO+2QsrRapZF/WpQZLoVsizTsgxFxyZoYp2yutaQSUe1MIEuUoLh3qBagCeFjUalHoXy7thHKGNMwYDY0PXQ6HY/+mAmaqbFhIBf0kMRHlOP5A99ZUWqY7V0Rvq2sEEOY5L8xXgsJ+AhN6zRwIW7ncgShpthbTFDG9NdvimuyrWKaSnEL2uhjTyhSPpkcQ8P71csK1KduuqaJApyKxtOD8a9LrcET41v3kQuLnrriUx5kKzA4mJF7PTor2rSg2AUGLhEoOZG27aBZOePIpTX9QuqY1UkmG3+kaBtgas0vYIKT40byK3D1p85QXBoyjwghvqa4LU3dv2ytlP7U+d60GXCNqYxdvrkIYS6ZUWpS7V0A6z81pjY2iXaDk69REXO9auFcHwvcCuwOG3dGSSiE0Jw2ktM4+1gWwPcl2rfe1BfkTIZh4IuEWbnsTPhPnCrikXl0I1IhRbAuuLrBEe1utx0hDnFpM/cRP0mcN1eQCb5FCiwgl4whUb2gO+zezeCUS+sIAzeYaKkAbfRhpblVPfNj4RCIDWhrIyiFbEXX0zo3bW16rZ/gf+S7HLLyQpocYmu7lBR2+SKFPoXpoMZyR3Ja91GOZvAinN3Xl2ghq6JLJ9LhyK54p5DR3J5dKLSxAGMQ/DTGygg1oLv4FGfLq2A246AN+kTN1WNNZyDdpD3gix/AsOfkavBS+M0PWTjX5+7AClXyxcNRVbyuZCZPlQ8krfhOAHS4F+LUL41uFg/s6AzOt97umnT48ktcbH/qcMtHYzu5R+o+NAVKaXyJ66MteWNI4tUs/eE/ES4cKeMKfgZNfJ5C8tuwfeOy4JEMU0oWgXC9MjrPpfvnj7Ds2nKtMFDxvfq1Wv48A79+vVr81veCSHzMzcTroO2HoPOxaHrcEWnExSYCyH8WhFXN8M6HPCXLpQAWy6JVM+lzYhtwRn4cWQj8rLnteXXt23bNnfe3AULFiyGn/jbYvwxafC4Xr/DnRiCikgEEygk4T+/3M9T/IrgXuwESTNDERsPT8iQiH/F/hWHz8HypqaqqRUZoqcj8L6Tn4SaL588P3DsyvWrM2fMQuxiN+gdO33w4EljN23q95tcEGDUaqzSgOImtsCHa1FiDtfVAjYHwdNvMWHF4cMXquVqiV4okICZt35WVkl//ebJrfuXjp1auXzJwqbWyaQh48cPmbJ5E2T4b3AHfMHNxhsVPGdw//LHRpRzRYq1Be1JWKf4ap1LbzS1F9WyqmpaSd949FDaGayGggfLvVsolZm58fXrl0/ePbt9/+3qVcdXLpszfyZo57rSdWOnDRkyeNyYTZjNmzf1+j2uqTPOLSVqjRoUF88ZbwWneSlVDCxuPgc5ieJDeGUVD50XiGwbuWLeTqfzzu5iGoxyrqNWXr//cPv2w7UbDqxatHL50jmzobZuaddsntRr/JBJm13r5jVrNg/+De5HSs08KMoyjuM11kxlM5VTzdRYNtUfNdUf3f3RTMc077K7LHsigcuxHMHi5krLISxg4C4ssUSAJC0kJFdiBsShhnigZGmGJKlpURp5oXmVk13T9/e8D/uy7LtJX+gdm3HYD9/9/o7nWe9A/eDOhUq3rvxD7GLcXOAyd0FL/ZbqDL0Uwh+Ysgt/OCgIK754t5C2BNoGsviMnSZV1X3zJ3ZvTY3UWOO0JqUCsMDNsBHl889LqFCG7YnZrGRvIA2vEa69OB/3FmQurzPRX7aRUY7JtsBaPzEY9da7ywpRf1kESmUZKHt6md3ed+73rk3m6HhYS6m1EStXEcRQM8jwolnU2r00JBluWcHHzFzXatbEeBrw4BiqKRHpa9krVr275kTfiqwVy9BrYaqM6JbM1dFcVrZ9eG/LAKyFrX5SCTWD9wjbLGrtTsJdTDx1TpiL8YsmRhsCF2D5MZkEVuy22Xj/WVSzz69YQVEKbgwOweFYV+Wtw2VpQ0FOXVnJtz1uXxHBBiaAo0I6XcYsau36KVx7TefHdCnUXKZiA43jLpJgwUpnnEIkleZsFk2Ny6uyZJoYSKuqPN5SV0lxQ05OTkNOQXN6af4ZKQCSrUYuHRrGk7PBBS+FoWw5zmjc3KgAWp4DikAWyu11dDi27uBwdv7vFwqzgmjXEakLrDWABW1DTXFHcZ29bPkoZq9NZJXGBMfF1+Oz2CAZLl7DlUt1VlMHczEYWIWBa9oGmbgkG0UJfr7zYI4IF/9+IWvFG6/6XXWItKUgBWcBiWg7musqvZWrBVXBaK/Pn4AA6aBZ1Nr12YDA6zlyOqnOmlcnEwuZK9GCFbCoqKD3/deP8NsWFr4uwtrXkRhtzvJyp9NZXk53FsUlLtzsVNkT7Dji54z63DZjEC2zdxa1dj3aJWXB6+yEuR11SazwxexyWqqkmMX4n2Bh/S1chla2LJHRVnkgL9Gy69F83FgAt6Su0sPvI0nFo273AAEG2Zvx1NUbGXr7IrxWQ2d+LtVZAgMEL+sJXIs/eDtGkFP2MqiwEN+oVhQYwZa6/LSE21DsKvVU2R2CpJJxnztDF+TubGrtkcUsjqVOVmcUBcZLmmJd9fb+w6tkaRPfEncFNN4tW1SCA7jUDnC178wFq5NlocPlLcO1WYBc4z7fgG6GubOptbvZvci6nHyKwiCiEKgl736x//D+w2uCWpXDDsMu/nnhwoXT88+dm7d5Y2N/I+8JxTVILsSDS+ZKtJLDAcBgBa/t/qvjMnPL0XIbBhspCpLe+ACsh/fv27dvUVBjXVe1ziGcOzAx8d3Ro7u3QqcOTl5Kh8FesYEVQCKsF1EIokU1bxzr9S3UcVhGO4tae26LCqbUOHOJNlky99XCNfsOM9Yv3tv3htwYAO78o7Ur02LXVqRYLXFDRy79888gGVxJ44HUQbBllFs5xSzhwNxa4yxqbe4D1BYcdR0dB0GLVuOAYrIRAc769l+X//iD3nwukdYD4TRXuydSnWKNi443RESYWsYmL12aTMJ8rPJUVpaSKr28yOT1Wva8UQKGAHu1uXb/PQ8//ubJWza7ShvKcwvOZy17Cx9yrME9HEPdv19kvXL2z8eEdVzwFA+P1+sl3I31FkLFXqgPVyjDdl3qn5yc7FcB2J6eXgWlpxNsaEUtyd6OPjxAqP9da3PvedJWhFnog9zhhxZcXPM+LjcRU3BSWsF6+fSFkbNnR/48LXhAJ7ZUv7zA3dZiEo9eaPo6fU/Lt0mT/SCuFuc2vRVXE3aQxZslYNSaLOpDjxfR3Db63G7fT5/P+3UVPyjQ5zKk9/66fKH72HcTI9DZHzwltAGwLYCpBH8u9TiEQ5kKxkrLilEftuvHxn7SZH+yMHstinnVNY7TMSRTa/c/+vATRbCV9ku32zj29UaccSHaCVcBmW62cGo9tue3Y0u7SQfmV+U0oNTZQyx4qvhSj+DocQMWrOw3D1cadh2sJlxAo8X8L7lGiVcftEO+kkH7G5vYAwPjx8uwqWyBFtPpBrMJ2Bfn/75n655jtbW17fhuP/Yduuhy6qPs4YTYYMWRo8SdQRLXVl24Mn7o62SQQtX4/n/AXwIXvMYZ57UbzOzEtJBepQB3XOyHVyclJW3ZkhiTeH7egnawNq1sSktLSyV9s+HzhvxciD1osvLBikupj30MlWCRBUVE/NAh/DzxJwI4aORERfFrrGB5B5BesnfGee0mapHRWkOY3n0yuf8gaXBwdSOlre+zYU3rhj1gjI2E1Gq1RqOxtuU68yWxPWA5zKWt+Ax2QQiwHPeIpZ///lBSdfW0Ns5O8vz0J8NbzrKg1+tscwNw5wAixWq1WOL27q1MaOwfPHjwEogT7F+P7R3atF69lhg1KfRX4uLM5uihseWdIiU9+R6AKJTZBU+vT2T145o3bU/w0zIlcGDa9xOZ+HFqhjrdelJ4uJ7hSroVvoEY2rRZSE5KqgbyYP/qn1qGtHEWJuKM1mrjTYYI5Y4dneW0rEB48gVWpBWcPuKUcJXx5qFPVdNp8REoeKULTIiWaBneb936cJ0uTPnyjdcE6i72RkMVm7YJKvbBalJjwvHMnghDvJbJRJxhCkU43hv3aA4QeZnhWcA2rEqiFUYDcHUKpclc/1VytYQLWjrhpedwe2O4vcG8wM2wKV5+ZW7QNeTTsUgmU9ew/6Ng1eojezGdwpgUeEvEdmor6s0vIESINTA6dDWXetnKUmWb6a4p+oimMZnDcly4az95Moev0JB8HD5xW9K6r5MZETfHTvHuTFWBVRD1VStmv1YZzu+vqHGg4/WOlhTU1BRD0njwesTlNddnDHA3HO5aWzerGK3kLl7gZ7fvTLkDjYGXW0xwtc07OjLSfZsM7rUv+e1t6xP89xyf1lewnmFQGImTbgRA63OWdDQ3u6aE0YtNm6zlWQjCrd8miOZKuCoh1210u0868UsSMpiD03DuxfbU2GevkdGDU7ixXduBy4G3d1VoiNeMmywdAdOQ9p0pLamspHXGS/JgZ7E7+PvhwSo1IwyGaGvr5ypmbgBuMS1dAO6sErsvQc/ovtvq0YuslNxQ4QXup0gux+1rQ/sSeeMNYbqF6P9Ibm6VNx1bFURPQvWrM5AW7oYBt+1UUjKxBuCmG9FVCVj/iUfwK4D36xZznMU6Vwb3JikMX0m49sj14LWyGYKiMxKu76THg+zJ66Q/uuKVPcO1pOzsUwXhCmeAC+mxo3xZKsjpFoZ7owzuHD/uzp3pflxhuLWCTwcAm/QM90PBLoRQca/Nf1mPL9FdrUWzYbsgRZfj0kKgZwofcA+M5oTAjbPcEDq8pNbNEi5qjU8zMjgMtL02rxBS4+6F4vDlItwIraWia1sQrkq4xS2OLEW40bijpeuXEyFwn5HDvcuPizqWaq2+Qs3GL3jN0YYMFNp4aNp0m49vCwG4cSkbhlVJQbgutw6ouIoOs6TmdXcf3T28MQg3mtIwJ3StkbvDUnhXt2mm1gU60RjhbnFo3NxetoxN0SKYHHd9WlJyEK69B0d0nSklDRv00qbICsvQ0KESGVzLTf85KNbHJkhp+KZNzewFL+zVFfnOhKaNOtMreisduzmuemufitNKuMJoZrR6JVjz0iI1+PTH0BOemTnWENAZoikNN8oPCs6rbuuTcD/vWst5rda4OEWRzykLyhpmiRusEi13FyuZde2GeQKnJfFb4W27YWt7qlpjMePOH1L06DMzfzwu7QwtWrM5dK1x3umD4rN6wiVRHAy+DLmusEj8oG281yjRiu7SWdhEuAsCcdnPvu9oU6w6xcIO+EoF1ZxCEQaHf7rF764W9oasNY47fVBsbFVDYnyRXt+XcjcvtJ6g0IreRBYCoiDiRlvVW4dVyRxWwvW2scsICLteOKQgi3vCAHx8yl0thXeO7KCgE0PQoFCvBy6PA3BdMrBYp8jeTjemHnilKEBsCls0O5uqEd4pWp5d4cddxGoy4E6CXUqEMSl7lIgEZXg8M14bjfDeJDsoUiEYHDAosJSt9fNadv0YONT5gp1I21QUJprYxoh2yl29OCdi92wUpChwd4VDLQYTZIig9RR/k+MqGfBYsTBGuGa5WoNuBS8DnjEoOC6lt+Wz4BwkApfC0NDLCo3s1UkCBLm7dsNngkTLcZFNoqUoEK+ES8CKzMzxnyJM8dGw9wbZ8II1LY14uwIGBWC5vUeOnI8KRSuM9rIyw0PCpc6gNJjM6vazp1WBtIRb02IgiV0hABdChnfEG0xk7+1yuNcBFgLwhuGApWwKt2JoOFHClT5aYYu1t7dIGg+sMehhLU4gYebI2pErV/5ISOC0Em763h0cl3gV+A9f4OWKiECw46nY5sjyPtgkAu/53uHHVdGg4GkYui9mRnAZL9EK72D+SsOMpVaPY2G0BkNrBLryg2o6LK812MuyQJiMVsSVeE0svag1Od2GT8HJ363TB0XrFO6RtVmEK4nhilGwL/QhtCTGChl1yjh1Wt7Spbj0qV3afeA+AbQzcH9uEd31G6uYwWsQ04Bak/W3e6R7aW3T9xhC/vBu47WGLCxYsigIlx8JnW6jiMvKC5k1WCJX5uXVNqHTqCNjm/IOnOO4qimxpYBogQtIEZZ4oWm8aL2oNVndnMcu7JbuXiCFd7Pf3U0npOhK4SVa2rXZfgtWREChtcaCtT0tUq3BKmdJiUxtP3BBSAjCLd2ljICUzFuFHxeS4oA0oNZkde2tK+mN6574RcItW69huBX1pxa/OrPrwt9F4roAWKCivJRmTWptHv3TCqDiIgWvZtXE1k6MJAgcVsJ1aHdxXMlc8DJxXJYGy7XyvA8iuU0raycmfpDCe6pNxN00DyGdyQtacS+Hr/g2IK61ebVpsexfVtDAMpm0ZosVm9fZE8ANgIUOZYq4krkz8kC4+AEhau3f5s4mJs4qCsNFELViFRuKGBNd6NKkGzUujLqBGeePAqMiM4xjHGdgIUTwJyzcaNUaujAOKzYsKITFJBhioC2RFhAaEE2MTWpa0hatRhc1Lpq69Jxzz3zn3rn3Ym2w8hpHNApPDu+55+d+M9aqHWNhbc5oyhC3VPqqi3BNXqL9DFeFLRmwK4UV+pYUzEpxdRZlOruzscIQ5JpBS/oecYkXiDVp4QVcb641Ktz0rFYoVgh36viZ5pccnSPv3mY6c2DXEbQAsCYgrATBv81uxP29+QUL93PCBSzBFV4xry/XqgEWcfWJYm4hhtGd/rLZlqId6Dmfn4TMSkNmwUiHZRUFBPgjMby59AjkWrPQsj5bWgorIa4NLLnmMa9qG5bTfdKU9V/PR46OnvBPEXOzk5N5uZwKswAAeeHX2d2TLP783VfyGwt0aTC8DS+7oTMldc3qelFJfaK4eqF/qFD6dsU7r389PcUWIBcGPz9EuGFMtsgY5ppGy7qCuCwHL+FmElLX7AmTNL0ioTgxO9nf/8W12eUT7jumi8dSYAFEZTFtGbcNzZvHQmHQcq7N/AMvucGXa3Vq80SrJ9mUpfNjcBxfWNsS/xoTYBt8W4JT4i/o54dDgXl/p29ZsUgZbAmL3LgdkmuWnle8E79pTdn5GNTRQnHoi8uX/3Dg/nRYkkMrpohLE0K8oxPMO/nzd13NDCvqDZ8M+8Mb4Ka8uVZePR0JcHtjpRgC5wuTW89d/cq61IflUdTmpb+n17iY18KFiSHs52XzYpdT5TFveYs+rw9AR2MADMSbm2sXjF0LTVTwjV28UfiHONOgeblQ2Lg/knn9uGRefw+5F6hAOFE0BwPQccIl4LPrUEJ09bWfpNGFJ1mTN3oIh0t0Qw66nIeabf1iRTdku8Gfa1XAFKlYPa0oXKWzy4vn+ozLr5mWKO3mzPDSK15nUHhT0Exc+NN51bek4ypGh3l9ufYUcsHqKdknuXYshrisdM94m+yyYHXU0lqmVX0gin8o0LZTeBNwlF242uVKVG94BTfjz7UmAoPwzmnLhgkNN5lLDA7e28z6+DA2jugEw720lCEz0OKpA8yb3/pC0lR0xTJvyOClQuHvIfcqsikoFJJro0c13FhiZmnwykA5VZCVgkviVpBYlXsx2WjXsHXhomvnbOHq4ZUu6W5PlxMDIe4ZMS/nGuNGOqEmDHYoQ8wcRtwyLVuW/wl4Fze4LYjbnUuOXX7EgfuRUSj8Jy/nmqUnFdnEWa2ujeq4yRTgzgwO/gg/7N3DenA5NFES0gIq2pjWkJHNy66joc9ZKG481+5UZMsTwwHu8ERON28WvysY4qcP4dBlNpbhPG2RROa9fFUo/YUCPfQvcu0udsPoaX3ZoB8NubD6rQ+e/GZmSWjFDsp9svciN8TS1/vZ8Hah8OOSebEp8+Ya456QQvG14YZYnHcCrYdP4hFg4gZTOGUZK55I9SQLl391FoqQjuvucvy5VsW4x7S96Skj15IZxgVOWi2ZuLzjoB1oi+aGSH7tD1+hEHnMm/Dm2lOKtxTp1XItpuGmUy1yuNKpa0cX9uAabjhEboD9xQ0VChs3k/DmWhOjQaGQXCvp5s0SBu/nsQILr9Q2DLo07OCGXHL9CxfuFTvXRDKw+XJtbw55wbwr3lxTpZYKF1JjfK1sY1rmpZ1/3lkovrcKhRPXl2vVCjcihQKWDUauRSjXCJVlhZe7HMGFrTS44X5GtCYKkSu6ZN67fYUCebFQeHMtESUewBUj2HagV3EDTEBrrkLRGzq5nXmDxakv1+5U4Y1p4/B8Ra4dCvHZ4KRVkNorze9i3n89URCuL9fuIlyjUPSWShpvugdLLCrayrje6LLgR1rm9TVlUQduhz/X7s4hr1kofoMBSHItxt8SzdDilEQ3MG8CzfuIq1DYuPo+MlhEenKtSuFGoFB4ci0ZL1NGHbgq80Iqyjdg3o8HzYmC55IbzrWnFC8XChmAxLyZVqGzYKlwcA+p4WbAvAuuLmegQ1ZP0OzJ70Zwt821JsAF6YVi3hyAutu3oUXRq3nyonnXh1wTxblBRlW7H/lTx/Xn2l6Fe1QrFEdKJaNQAIoBqdPSZQq9Eq9h3mu/blcogtnJEV1/rlUr3Cm9UJw9ZhSKkO0GHtUZtxVFuGLebM5dKOYH9ZIizFpPRk1ZlXeiQEmhsHOtrd1Di2JcDq+Ytzs3teDqco4sLVWCUoBV2yE3Vnd7JwouFMO+XOts99iWcFmUc+bJu/6XUOprXqIM/mWeSjhbEdeda/6JYm7UXDa0Rr24Qsvpxrho3uXrF525JvfChFk+1KOeXPNPFO66FqMD14/b3s6OkNMsHsd5eGHemWs8kgIfOQpe6a/ihu3qWlVEgXGhkLom5g23uq3LwZXL4WiA20aP5Zxy1rUoTvkEeoiWQoLLydaB86Uv1x5VVKXlXlnsjRrmTbS7cOkcY171ormhDefhha8duJ8snYSw4mndgrgoozHF/xbd4Mu1JsbSCsUK4cpE0R514MqpK4+3yMGL25GJyQHnAARM6AXCRe6AlgIMZtgu1/YmSVOjpyTXzLqWAxCndTnHVK5JcMmAcJTF1r90NmVwcrGbopr4dEDvbpdr1QgLDtUKRW9Ez7VkpKXdm2n0wtg8u3O+pHqOzt7v3pSFGJdjyrj0EmJcyTX7yZwkauLsC82yRDfM2/aiF1ckwUVcMu/0w85NGfULjCmdEn2NWUq4CW+uNeXTIHlkT3KNlU45caMVvIyLDQzmC5j32F/OTdkSXwUyMCSe7LjDjOvPtSfyeQKePm3XNS4UVq5FSeIEybSwUrwDjjI8bfwDEAeYV8O8qSibwZ9rdXQ7zBdsskTXzXuoNSSk8AcfDSI2A8eWcMENOThtbP0ol9ktpAAXpHATIF+uVfHd+4QUigFYohuFol1QzUIhijIuR5fcMLrivlKJk7iJRFymZTsQrjfXHi0Q8LJWKL6dNgsFmZfLu/iXDSzW4+AyLrwv4YwD98ulpbjwykobvxRcfw9ZOzaGvGkuFLJE9xYKCS9Dl40nwmuG7PnfnJuyVcE1rn7YuwrXm2s1RcU7fUpbNhw1uhxrCmb7MrNxKBA03Ud3Z0ufOJuyODApXOKkwJZPQGwgkdaba9XFYhF487NSKIZLJcO8oe3my4BWostuyB53N2VtKMINghqUF0w0wuVcs7V/sogBXpZCMUCLPTFvh2e+DFU8sSTIdMGbXTzhHIDihBtWoEwqh5iiTXlzrR4er4P45qVQSF0j5btfjDpYWWVaRmVacsPxbx24n20sMS7Ki+vNtZqhkRGI7yYXCrkctrscUTBo6bRSJtQ65nxuwDkAsRtICpTgaZJAAW3KO6/VwTOBk4A7K4XitJlrkWileRFWF8GCGJZxU8fdTVlHWyD1mBRLYpuSZ7Qs9fcj7+aCFAp4OtYwb7zdDq3EFsRVSqV3gNu9uOJ8y0yHqI0fQiMxLrDKe2ps7SPesXV8EoOX6FPEK12OgcuwuoIlEtESLl46LZ5xPJE2txrXeOPq6d1MBr7OEKyizT7lw63tR95iYXZev7Dyj8MhBhbkoD4RLkWYFgaLZ23aLnggUg8vwSZQdOAybE9PzpdrjYg7NLmJw6As0SvGYW2xWRFd/YZY2SHEuImN80ds3JfOjVMoScDL+cWRJVaAjUX2+rocwh0Zw2HQrGv2OEygph2CRiKoGIybgfDOW7RdL30/nlHCiIL4NBBYYE3mx2q8hUK5YT3f12ws9uxxmFAFVlwguPhVgDv+vf3G8a55wk1o6mRYYd1fW73Hp/p+5J0sLMzZywbucgJcPbqCS7wBLXUq1LgunrOC2/XyxY0NIbUCm0wX7qutEzhbNYQ7sjm7Yi/22Lzl/tmMLjmVeXVcDC6VqI1LL5i49ODypVUzsIo1i4FNF4r1jXu2V10/aqSIXY4MQGaXc0gOBZ02ZOKSOLiIm9kYNmkJ98q4wBIrBxZMsK9GTOBVv3LD+ibh8rLB7HJa5VAACSzhyvwti0R1jo7/UhlcwL13nFkFlkxgGtavfcoNhfXhZnnLkrn0J1yJLndgXB5AvDtQlY15IZ/Gf6zEBc2tZkxYyK7CfZYJvKolXHDDaa0pi1lLf72M6aHlEVG2DTKBr56zaV+5mNkAVM4vZYL6Rqsq+NWozDvJXY40ZTIOg3ktWDECDW/4NrvgoVPuBjdSA8YxRriv/LAKqAoWs8ttWL+q2bxUKKQpM5b+rZZpmVdwcTkiuFRbO1Y/NqJLtC+fGe8GUWDBsNapdaPmvV7otZcN3OUwrtGEMzAwamYoTz+ES7kmuPzuoRXE7QEToGFvQlX1VIiLUigGKpqyHjaDwLIAmEuxXIgALNPquUZeoM/N/nWjOxdJF/fVgGFvTjXU5qytGE0ZSLsdroAN67xSoomWYEmrPwgu0r5Gn5I8VSrcHKv4dx+0OWsPW02Z3A5rtAzLQyLScuzLC3uGhTqR6GNa8i3Bvv24lNmbV+3Q0LW/tKbMLBSdh0ICywJWmsCplNEYwzOi1sGsfhS8b4hh33rv6T07obr9W9eCcfizklkosoRrhpajy55WM6LClZ5g/N6yEcC0+Omt773/6T17dkb1a/N6U2aat8UILYLKdBhmXLRyBe4VfgsZwb4FsM/csWentBfMK1tp07xRK7QkAkRObstpySDt1uoloFWRfYdgIbQ7p+rmMu9peMuS0aJHddeycJblUMfLa6NgpCVtbAwDLcG+/+mzDQC7o3rgVeSl6R0odfNGrdDybCgjOINmmJXWMYunX2HYZ+DT5Hdat7+ueJtf3VymTyiSZ+BCFZEV0YxIywWlgLWn5/zsQ29Afn1wsAEtu/Nq+Ao+AYUKxUI+DbyxcpfTFrJCS6isChPQB1pMlZpqbn+cA/sf6cA7XUjbfGp2E3iT8gxciGNr0RIlBLi830JWfOflfU11BxoOHmw4AIH973TPwTcReH4N9r4IzLmWDVmwGYaVTQFIsSbHqMweOADJ9V+r4T34rPkjW1u4SE0zcDqHsWVYwa0YaGn+zkFfCKy3TgcOvvXmy0PXYJPKAUbzdsTt2ApqwBrJY0twa3Vbw3tvNzw3MkSbagBGdcb/kRUNi4PMrdcdjz14D3ZpRXYwmDdepjU8AJgBKxn2fxL876lqaZdaoACnc0FgHX6F5Crs48n71ku6tH4MMKVcJCHZJbsi+BOTiwy7C1RPy3W6KuwEWB2VhMkFJmjcs0vU2M8OLmQ7LNTAsLtH1ZxxxVgGKwFhonrU5P2/G9ZSLRmimCRYJqV94f7dYVg744B3pNCdKqMi6331u8awdoDhtnAy1w2oENZIOl/cXYa11Lh/aCiZjdFbn4F11xnWseopxJB1lxrWcX2ch4uD3WvYSlXX3kLD/g3E7jEN/LR7GQAAAABJRU5ErkJggg==";
    
    openButton.appendChild(img);
    document.body.appendChild(openButton);

    openButton.addEventListener('click', () => {
      openButton.classList.add('_hidden');
      wheelWrap.classList.remove('_hidden');
      wheelWrap.classList.add('_active');
    });

    const openDelay = options.autoOpenDelay * 1000
    setTimeout(() => {
      // if (!localStorage.getItem('wheeleeShown')) {
        wheelWrap.classList.remove('_hidden');
        wheelWrap.classList.add('_active');
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);
        localStorage.setItem('wheeleeExpiry', expiryDate.getTime());
      // }
    }, openDelay || 3000);

    const closeButton = document.createElement('button');
    closeButton.className = 'widget-close-btn';
    closeButton.innerHTML = '✕'; 
    wheelWrap.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
      wheelWrap.classList.remove('_active');
      openButton.classList.remove('_hidden');
      wheelWrap.classList.add('_hidden');
    });
  }

  function updateScreenWidth() {
    const screenWidth = window.innerWidth;
    size = screenWidth <= 550 ? screenWidth : 550;
    canvas.width = size;
    canvas.height = size;
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
              background: #212230;
              position: fixed;
              height: 100vh;
              width: 70%;
              left: 0;
              top: 0;
              transition: opacity 0.3s ease, transform 0.3s ease; 
              opacity: 1;
              transform: translateX(-100%);
              z-index: 1000;
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
          @media (max-width: 767px) {
            .widget-wheel-wrap {
              flex-direction: column;
              width: 100%;
            }
          }
          .widget-wheel-wrap canvas {
            position: absolute;
            left: -275px;
          }

          .form-title, .form-subtitle, .policy-text {
            color: #99A1BA;
          }

          .policy-text a {
            color: #fff;
          }
          
          .widget-open-btn:hover {
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

          .checkbox-box:hover {
            border: 1px solid ${color};
          }

          .form-wrap {
              width: 100%;
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              max-width: 400px;
          }
          .wheel-form {
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
              align-items: center;
              gap: 20px;
              border: 1px solid rgba(255, 255, 255, 0.1);
              height: 60px;
              border-radius: 10px;
              padding-left: 20px;
              padding: 10px 20px;
              transition: opacity 0.4s ease, box-shadow 0.4s ease, border 0.4s ease;
          }

          .input-wrap img {
            display: inline;
            height: 20px;
          }

          .form-input {
            width: 100%;
            max-width: 100%;
            outline: none;
            background-color: transparent;
            color: white;
            border: none;
          }

          .input-wrap:focus-within  {
            border: 1px solid ${color};
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

          .input-wrap.error {
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
            margin: 0;
            position: relative;
            left: 50%;
            width: 65px;
            transform: translateX(-50%);
            height: 20px;
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

            .widget-wheel-wrap canvas {
              position: absolute;
              top: -${size / 2}px;
              transform: translateX(-50%) rotate(90deg) scale(0.9);
              left: 50%;
            }

            .wheel-form {
              left: 50%;
              top: ${size / 2 + 80}px;
              transform: translateX(-50%);
              width: 90%;
              max-width: 400px;
              color: #fff;
            }

          }

          .widget-wheel-spin-btn {
            margin: 60px auto;
          }

          .widget-open-btn {
              position: fixed;
              z-index: 999997;
              width: 100px;
              height: 100px;
              cursor: pointer;
              left: 10px;
              bottom: -30px;
              background-color: transparent; 
              background-size: contain;
              transform-origin: right bottom;
              outline: 0;
              animation: shakeBox 2.5s infinite;
              transition: all 0.4s ease;
            }

            .widget-open-btn img {
              width: 100px;
              height: fit-content;
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
  const TWO_PI = 2 * Math.PI; 

  let lastDrawnRotation = -999;     
  const MIN_ANGLE_CHANGE = 0.003;  

  function startIdleRotation(speed = 0.0002) {  
      stopIdleRotation();  

      let lastTime = performance.now();

      function tick(now) {
          if (spinning) {
              stopIdleRotation();
              return;
          }

          const dt = now - lastTime;
          lastTime = now;

          // накопичуємо кут плавно
          rotation += speed * dt;           // dt в мілісекундах → природна швидкість
          rotation = rotation % TWO_PI;

          // малюємо ТІЛЬКИ якщо зміна помітна
          const angleDiff = Math.abs(rotation - lastDrawnRotation);
          if (angleDiff >= MIN_ANGLE_CHANGE || angleDiff > Math.PI * 1.9) {  // враховуємо перехід через 2π
              drawWheel();
              lastDrawnRotation = rotation;
          }

          idleAnimationId = requestAnimationFrame(tick);
      }

      idleAnimationId = requestAnimationFrame(tick);
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
      const maxWidth = size / 2 - 100;
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
    ctx.arc(center, center, 60 * (size / maxSize), 0, 2 * Math.PI);
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
  
    const duration = 5000;
    const start = performance.now();
    const initialRotation = rotation;
  
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

        if (collectData === "tel" ) {
          const flagIcon = new Image();
          flagIcon.src = "data:image/svg+xml,%3Csvg%20width%3D%2280%22%20height%3D%2280%22%20viewBox%3D%220%200%2080%2080%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_1_5)%22%3E%3Cpath%20d%3D%22M71.1111%2011.1111H8.8889C6.53142%2011.1111%204.2705%2012.0476%202.60351%2013.7146C0.936521%2015.3816%201.52588e-05%2017.6425%201.52588e-05%2020L1.52588e-05%2040H80V20C80%2017.6425%2079.0635%2015.3816%2077.3965%2013.7146C75.7295%2012.0476%2073.4686%2011.1111%2071.1111%2011.1111Z%22%20fill%3D%22%23005BBB%22%2F%3E%3Cpath%20d%3D%22M80%2060C80%2062.3575%2079.0635%2064.6184%2077.3965%2066.2854C75.7295%2067.9524%2073.4686%2068.8889%2071.1111%2068.8889H8.8889C6.53142%2068.8889%204.2705%2067.9524%202.60351%2066.2854C0.936521%2064.6184%201.52588e-05%2062.3575%201.52588e-05%2060V40H80V60Z%22%20fill%3D%22%23FFD500%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_1_5%22%3E%3Crect%20width%3D%2280%22%20height%3D%2280%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
          divInput.appendChild(flagIcon);
        }

        input.addEventListener('input', (e) => {
          const rawValue = input.value;
          let digits = getCleanDigits(rawValue);

          if (digits.length === 0) {
            input.value = '';
              return;
          }

          const formatted = formatPhone(digits);
          input.value = formatted;
          setCursorPosition(input, formatted.length);
          contact = e.target.value
        });
        
        // input.addEventListener("input", e => contact = e.target.value);
        divInput.appendChild(input);

      // Валідація
        function validateInput() {

          if (collectData === "email") {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
              isInputValid = emailRegex.test(input.value.trim());
          } else if (collectData === "tel") {
              const telRegex = /^\+38\s*\(\s*0\d{2}\s*\)\s*\d{3}\s*-\s*\d{2}\s*-\s*\d{2}$/;
              isInputValid = telRegex.test(input.value.trim());
          }
          
          if (!isInputValid) {
            divInput.classList.add("error");

              setTimeout(() => {
                divInput.classList.remove("error");
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
        policyText.innerHTML = `Я даю свою <a href="#" class="" target="_blank">Згоду</a> на обробку персональних даних і підтверджую ознайомлення з <a href="${options.privacyUrl}" class="" target="_blank">Політикою</a> обробки персональних даних`;
  
        divCheckWrap.appendChild(divCheck);
        divCheckWrap.appendChild(policyText);
  
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
        const prizeText = document.createElement("div");
        prizeText.className = "widget-prize-title";
        prizeText.textContent = prize;
        
        const btn = document.createElement("button");
        btn.id = "close_button";
        btn.textContent = "Закрити";
        btn.style = `color: ${getContrastTextColor(baseColor)}`
        btn.className = "widget-wheel-spin-btn";
        btn.style.backgroundColor = options.color;
        btn.addEventListener('click', () => {
          wheelWrap.classList.remove('_active');
          openButton.classList.remove('_hidden');
          wheelWrap.classList.add('_hidden');
        });

        showConfetti();
  
        const msg = document.createElement("div");
        msg.className = "widget-prize-text";
        msg.textContent = options.successMessage;
  
        wheelForm.appendChild(prizeText);
        wheelForm.appendChild(msg);
        wheelForm.appendChild(btn);
      }
    }
  }

  function showConfetti() {
    const palette = [
      '#ff0000', '#ff8800', '#ffff00', '#44ff44',
      '#0088ff', '#aa00ff', '#ff44aa', '#ffcc66',
      '#ffffff', '#ff6699', '#00ffcc', '#9966ff'
    ];
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    canvas.style.cssText = `
      position: absolute; inset: 0; 
      pointer-events: none; z-index: 9999;
      width: 100%; height: 100%;
    `;
  
    const container = document.getElementById('wheelee-container') || document.body;
    container.appendChild(canvas);
  
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  
    const particles = [];
  
    for (let i = 0; i < 180; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 3 + Math.random() * 11;          
      const velX  = Math.cos(angle) * speed;
      const velY  = Math.sin(angle) * speed - 8;     
  
      particles.push({
        x: canvas.width  * (0.3 + Math.random() * 0.4),   
        y: canvas.height * (0.4 + Math.random() * 0.3),
        size: 3 + Math.random() * 14,                    
        vx: velX,
        vy: velY,
        color: palette[Math.floor(Math.random() * palette.length)],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 12,
        life: 90 + Math.random() * 140,                   
        alpha: 1
      });
    }
  
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      let alive = false;
  
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.18;               
        p.vx *= 0.98;               
        p.rotation += p.rotSpeed;
        p.life--;
        p.alpha = Math.max(0, p.life / 100);
  
        if (p.life > 0 && p.y < canvas.height + 50) {
          alive = true;
  
          ctx.save();
          ctx.globalAlpha = p.alpha * 0.9;
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
  
          const w = p.size * 0.6;
          const h = p.size * 1.6;
          ctx.fillRect(-w/2, -h/2, w, h);
  
          ctx.restore();
        }
      }
  
      if (alive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
  
    animate();
  }
  
  function handleWindowResize() {
    updateScreenWidth()
  }

  window.addEventListener("resize", handleWindowResize);

  updateScreenWidth()
  
  const maxDigits = 12;

  function getCleanDigits(str) {
      let cleaned = str.replace(/[^\d+]/g, '');
      if (cleaned.startsWith('+')) {
          return '+' + cleaned.slice(1).replace(/\D/g, '');
      }
      return cleaned.replace(/\D/g, '');
  }

  function normalizePhone(digits) {

      if (digits.startsWith('8')) {
          if (digits.length === 1) {
              digits = '38';
          } else {
              const second = digits[1];
              if (second === '0') {
                  digits = '380' + digits.slice(2); 
              } else {
                  digits = '380' + '0' + digits.slice(1);
              }
          }
      } else if (digits.startsWith('0')) {
          digits = '380' + digits.slice(1);
      } else if (digits.startsWith('3')) {
          if (digits.length === 1) {
              return digits;
          } else if (digits[1] !== '8' && digits[1] !== '0') {
              digits = '380' + digits.slice(1);
          } else if (digits[1] == '0' && digits[1] !== '8') {
              digits = '380';
          } else if (digits[2] !== '0' && digits[1] !== '8') {
              digits = '380' + digits.slice(2);
          } else if (digits.length === 3 && digits[2] !== '0') {
              digits = '380' + digits.slice(2);
          }
      } else {
          digits = '380' + digits;
      }
      
      return digits.substring(0, maxDigits);
  }
      
  function formatPhone(digits) {
      if (digits === '+') return '+';
      let val = normalizePhone(digits.replace(/\D/g, ''));
      let result = '+';
      if (val.length > 0) result += val.substring(0, 2);             // +38
      if (val.length >= 3) result += ' (' + val.substring(2, 5);     // +38 (0XX
      if (val.length >= 6) result += ') ' + val.substring(5, 8);     // +38 (0XX) XXX
      if (val.length >= 9) result += '-' + val.substring(8, 10);     // +38 (0XX) XXX-XX
      if (val.length >= 11) result += '-' + val.substring(10, 12);   // +38 (0XX) XXX-XX-XX

      return result;
  }

  function setCursorPosition(el, pos) {
      window.requestAnimationFrame(() => {
          el.setSelectionRange(pos, pos);
      });
  }

  function checkPopupExpiry() {
    const expiry = localStorage.getItem('wheeleeExpiry');
    if (expiry && Date.now() > parseInt(expiry)) {
      localStorage.removeItem('wheeleeShown');
      localStorage.removeItem('wheeleeExpiry');
    }
  }
  
  checkPopupExpiry();

  render();
  drawWheel();
  startIdleRotation();
  
}



