const headerRender = ({logo, menu} = {}) => `
  <header data-render="header" data-option='${JSON.stringify({logo, menu})}'>
    <div class="contact">
      <div class="info">
        <div>
          <img src="../image/icon/location.png" alt="location" title="location"><span>부산시 해운대구 123</span>
        </div>
        <div>
          <img src="../image/icon/phone.png" alt="phone" title="phone"><span>123-456-7890</span>
        </div>
        <div>
          <img src="../image/icon/email.png" alt="email" title="email"><span>webskills@skills.com</span>
        </div>
      </div>

      <div class="social">
        <a href="#"><img src="../image/icon/social1.png" alt="social1" title="social1"></a>
        <a href="#"><img src="../image/icon/social2.png" alt="social2" title="social2"></a>
        <a href="#"><img src="../image/icon/social3.png" alt="social3" title="social3"></a>
        <a href="#"><img src="../image/icon/social4.png" alt="social4" title="social4"></a>
      </div>
    </div>
    <div class="navi">
      <div id="site-logo">
        <a href="#">
          ${logo
            ? `<img src="${logo}" alt="logo" title="logo">`
            : `<img src="../image/logo/logo.png" alt="logo" title="logo">부산국제매직페스티벌`
          }
        </a>
      </div>
      <nav id="gnb">
        <ul>
          ${menu
            ? menu.map(({url, title}) => `<li><a href="${url}">${title}</a></li>`).join('')
            : `
            <li><a href="#">MENU1</a></li>
            <li><a href="#">MENU2</a></li>
            <li><a href="#">MENU3</a></li>`}          
        </ul>
      </nav>
    </div>
  </header>
`

const footerRender = () => `
  <footer data-render="footer" data-option='null'>
    <div id="admin-info">부산국제매직페스티벌 | Busan International Magic Festival<br>부산시 해운대구 123<br>TEL : 123-456-7890 | FAX : 098-765-4321 | E-mail : webskills@skills.com</div>
    <ul id="social">
      <li><a href="#"><img src="../image/icon/social1.png" alt="social1" title="social1"></a></li>
      <li><a href="#"><img src="../image/icon/social2.png" alt="social2" title="social2"></a></li>
      <li><a href="#"><img src="../image/icon/social3.png" alt="social3" title="social3"></a></li>
    </ul>
    <div id="copyright">Copyrightⓒ 2019, webskills all right reserved</div>
  </footer>
`

const visual1Render = () => `
  <section data-render="visual1" data-option='null' class="visual visual1">
    <div class="slide"></div>
    <div class="slide"></div>
    <div class="visual-text">
      <h1>부산국제매직페스티벌</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque maxime error fugiat, non, accusantium atque. Dolores velit, reiciendis repellendus odit illo unde. Qui error labore perferendis quos veritatis, voluptatibus itaque.
      Learn more</p>
      <a href="#" class="btn btn__green big">바로가기</a>
    </div>
  </section>
`
const visual2Render = () => `
  <section data-render="visual2" data-option='null' class="visual visual2">
    <input type="radio" name="slide" id="slide1" checked>
    <input type="radio" name="slide" id="slide2">
    <input type="radio" name="slide" id="slide3">
    <div class="visual-text">
      <h1>부산국제매직페스티벌</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque maxime error fugiat, non, accusantium atque. Dolores velit, reiciendis repellendus odit illo unde. Qui error labore perferendis quos veritatis, voluptatibus itaque.
      Learn more</p>
      <a href="#" class="btn btn__green big">바로가기</a>
    </div>
    <div class="slide-section">
      <div class="slide"></div>
      <div class="slide"></div>
      <div class="slide"></div>
    </div>
    <div class="btns">
      <div>
        <div class="slide-btn prev">
          <label class="none">&lt;</label>
          <label for="slide1">&lt;</label>
          <label for="slide2">&lt;</label>
        </div>
        <div class="slide-btn next">
          <label for="slide2">&gt;</label>
          <label for="slide3">&gt;</label>
          <label class="none">&gt;</label>
        </div>
      </div>
    </div>
  </section>
`
const feature1Render = () => `
  <section data-render="feature1" data-option='null' class="content feature1">
    <h2>Features</h2>
    <div class="wrap">
      <article>
        <img src="../image/icon/1.png" alt="icon1" title="icon1" class="img-body">
        <h3>Lorem ipsum1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
      <article>
        <img src="../image/icon/2.png" alt="icon2" title="icon2" class="img-body">
        <h3>Lorem ipsum2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
      <article>
        <img src="../image/icon/3.png" alt="icon3" title="icon3" class="img-body">
        <h3>Lorem ipsum3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button class="btn">Read More</button>
      </article>
    </div>
  </section>
`
const feature2Render = () => `
  <section data-render="feature2" data-option='null' class="content feature2">
    <h2>Features</h2>
    <div class="wrap">
      <article>
        <div class="img">
          <img src="../image/icon/4.png" alt="icon1" title="icon1" class="img-body">
        </div>
        <h3>Lorem ipsum1</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
      <article>
        <div class="img">
          <img src="../image/icon/5.png" alt="icon2" title="icon2" class="img-body">
        </div>
        <h3>Lorem ipsum2</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
      <article>
        <div class="img">
          <img src="../image/icon/6.png" alt="icon3" title="icon3" class="img-body">
        </div>
        <h3>Lorem ipsum3</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam officia aspernatur nisi ut eligendi consectetur voluptate, fuga magni quasi. Nisi ratione veniam id illum, facere reiciendis assumenda quis quod maxime!</p>
        <button type="button">Read More</button>
      </article>
    </div>
  </section>
`
const gallery1Render = () => `
  <section data-render="gallery1" data-option='null' class="content gallery1">
    <h2>Gallery</h2>
    <input type="radio" name="pos" id="pos1" checked>
    <input type="radio" name="pos" id="pos2">
    <input type="radio" name="modal" id="modal1">
    <input type="radio" name="modal" id="modal2">
    <input type="radio" name="modal" id="modal3">
    <input type="radio" name="modal" id="modal4">
    <input type="radio" name="modal" id="modal5">
    <input type="radio" name="modal" id="modal6">
    <input type="radio" name="modal" id="close">
    <div id="modal">
      <div class="wrap">
        <img src="../image/gallery/19.jpg" alt="19.jpg" title="19.jpg">
        <img src="../image/gallery/24.jpg" alt="24.jpg" title="24.jpg">
        <img src="../image/gallery/11.jpg" alt="11.jpg" title="11.jpg">
        <img src="../image/gallery/20.jpg" alt="20.jpg" title="20.jpg">
        <img src="../image/gallery/27.jpg" alt="27.jpg" title="27.jpg">
        <img src="../image/gallery/25.jpg" alt="25.jpg" title="25.jpg">
        <label for="close">X</label>
      </div>
    </div>
    <div class="wrap">
      <div>
        <article>
          <label for="modal1"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum1</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal2"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum2</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal3"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum3</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal4"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum4</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal5"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum5</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal6"></label>
          <div class="img"></div>
          <div class="text">
            <h3>Lorem ipsum6</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
    </div>
    <div class="btns">
      <label for="pos1"></label>
      <label for="pos2"></label>
    </div>
  </section>
`
const gallery2Render = () => `
  <section data-render="gallery2" data-option='null' class="content gallery2">
    <h2>Gallery</h2>
    <input type="radio" name="modal" id="modal1">
    <input type="radio" name="modal" id="modal2">
    <input type="radio" name="modal" id="modal3">
    <input type="radio" name="modal" id="modal4">
    <input type="radio" name="modal" id="modal5">
    <input type="radio" name="modal" id="modal6">
    <input type="radio" name="modal" id="modal7">
    <input type="radio" name="modal" id="close">
    <div id="modal">
      <div class="wrap">
        <img src="../image/gallery/19.jpg" alt="19.jpg" title="19.jpg">
        <img src="../image/gallery/24.jpg" alt="24.jpg" title="24.jpg">
        <img src="../image/gallery/11.jpg" alt="11.jpg" title="11.jpg">
        <img src="../image/gallery/20.jpg" alt="20.jpg" title="20.jpg">
        <img src="../image/gallery/27.jpg" alt="27.jpg" title="27.jpg">
        <img src="../image/gallery/25.jpg" alt="25.jpg" title="25.jpg">
        <img src="../image/gallery/26.jpg" alt="26.jpg" title="26.jpg">
        <label for="close">X</label>
      </div>
    </div>
    <div class="wrap">
      <div class="left side">
        <article>
          <label for="modal1"></label>
          <div class="text">
            <h3>Lorem ipsum1</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal2"></label>
          <div class="text">
            <h3>Lorem ipsum2</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
      <div class="middle">
        <article>
          <label for="modal3"></label>
          <div class="text">
            <h3>Lorem ipsum3</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal4"></label>
          <div class="text">
            <h3>Lorem ipsum4</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal5"></label>
          <div class="text">
            <h3>Lorem ipsum5</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
      <div class="right side">
        <article>
          <label for="modal6"></label>
          <div class="text">
            <h3>Lorem ipsum6</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
        <article>
          <label for="modal7"></label>
          <div class="text">
            <h3>Lorem ipsum7</h3>
            <p class="sub">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
            <p class="desc">Tempore harum laborum eos nisi rerum ad aspernatur explicabo. Obcaecati commodi ipsa, corporis, dolores saepe exercitationem perspiciatis esse quos totam autem iure.</p>
          </div>
        </article>
      </div>
    </div>
  </section>
`
const contact1Render = () => `
  <section data-render="contact1" data-option='null' class="contacts1 ">
    <div class="wrap">
      <form class="contact-form">
        <h2>Contact Us</h2>
        <label for="name"><input type="text" name="name" id="name" placeholder="이름을 입력하세요."></label>
        <label for="email"><input type="email" name="email" id="email" placeholder="이메일을 입력하세요."></label>
        <label for="message">
          <textarea name="message" id="message" placeholder="메시지를 입력하세요."></textarea>
        </label>
        <button type="submit" class="btn">전송</button>
      </form>
      <div class="contact-info">
        <h3>Contact information</h3>
        <div>
          <div class="address">
            <div class="icon"><img src="../image/icon/location.png" alt="location" title="location"></div>
            <p>주소 : 부산시 해운대구 123</p>
          </div>
          <div class="tel">
            <div class="icon"><img src="../image/icon/phone.png" alt="phone" title="phone"></div>
            <p>전화번호 : 123-456-7890</p>
          </div>
          <div class="email">
            <div class="icon"><img src="../image/icon/email.png" alt="email" title="email"></div>
            <p>이메일 : webskills@skills.com</p>
          </div>
        </div>
      </div>
    </div>
  </section>
`
const contact2Render = () => `
  <section data-render="contact2" data-option='null' class="contacts2">
    <div class="contact-info">
      <div>
        <article class="address">
          <div class="icon"><img src="../image/icon/location.png" alt="location" title="location"></div>
          <p>주소 : 부산시 해운대구 123</p>
        </article>
        <article class="tel">
          <div class="icon"><img src="../image/icon/phone.png" alt="phone" title="phone"></div>
          <p>전화번호 : 123-456-7890</p>
        </article>
        <article class="email">
          <div class="icon"><img src="../image/icon/email.png" alt="email" title="email"></div>
          <p>이메일 : webskills@skills.com</p>
        </article>
      </div>
    </div>
    <form class="contact-form">
      <h2>Contact Us</h2>
      <label for="name"><input type="text" name="name" id="name" placeholder="이름을 입력하세요."></label>
      <label for="email"><input type="email" name="email" id="email" placeholder="이메일을 입력하세요."></label>
      <label for="message">
        <textarea name="message" id="message" placeholder="메시지를 입력하세요."></textarea>
      </label>
      <button type="submit" class="btn">전송</button>
    </form>
  </section>
`
const headerOptionRender = ({logo, menu, urls} = option) => `
  <form class="fields">
    <fieldset>
      <legend class="legend">Header 옵션 설정</legend>
      <input type="hidden" name="action" value="header" />
      <ul>
        <li>
          <label>
            <span class="fields__list">이미지 업로드</span>
            <input type="file" name="logo_uploaded" id="logoUploader" class="fields__input full" accept="image/*" />
          </label>
        </li>
        <li>
          <span class="fields__list">이미지 선택</span>
          <div>
            ${['logo1', 'logo2', 'logo3'].map(v => `
            <label class="fields__custom-radio">
              <input type="radio" name="logo" value="../image/logo/${v}.png" ${v === logo ? 'checked' : ''} />
              <img src="../image/logo/${v}.png" alt="${v}" />
            </label>
            `).join('')}
          </div>
        </li>
        <li>
          <span class="fields__list">메뉴 설정</span>
          ${[1,2,3,4,5].map((v, k) => `
          <div class="fields__input-list">
            <label>
              <span>메뉴${v} 이름</span>
              <input type="text" name="menu_title" class="fields__input" value="${menu && menu[k] !== undefined ? menu[k].title : (v > 3 ? '' : `MENU${v}`)}" placeholder="메뉴${v}의 타이틀을 입력해주세요"  />
            </label>
            <label>
              <span>메뉴${v} URL</span>
              <select name="menu_url" class="fields__input">
                <option value="#">#</option>
                ${urls.map(v => `
                <option value="${v}">${v}</option>
                `).join('')}
              </select>
            </label>
          </div>
          `).join('')}
        </li>
        <li class="fields__buttons center">
          <button type="submit" class="btn btn__main big">적용</button>
          <button type="button" class="btn btn__default big" onclick="$('.layer__close').click();">취소</button>
        </li>
      </ul>
    </fieldset>
  </form>
`