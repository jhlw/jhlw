/* ============================================================
   需求分析教学工作区 — 可复用测验组件
   用法（两种题型）：

   1) 单选题（点击选项，即时反馈，答对锁定并展开解释）：
   <div class="quiz" data-answer="c">
     <p class="quiz-q" data-no="Q1">题干……</p>
     <p class="quiz-sub">（可选：补充说明 / 数据表）</p>
     <ul class="quiz-opts">
       <li data-key="a"><span class="key">a</span>选项一</li>
       <li data-key="b"><span class="key">b</span>选项二</li>
       <li data-key="c"><span class="key">c</span>选项三</li>
     </ul>
     <div class="quiz-explain" hidden>答对后展开的解释……</div>
   </div>

   2) 自评题（自己写，再对参考答案）：
   <div class="quiz selfcheck">
     <p class="quiz-q" data-no="Q3">题干……</p>
     <textarea placeholder="把你的答案写在这里"></textarea>
     <button class="quiz-reveal" type="button">对答案</button>
     <div class="quiz-explain" hidden>参考答案……</div>
   </div>

   依赖：assets/style.css
   ============================================================ */

(function () {
  "use strict";

  function initQuiz(root) {
    if (root.dataset.answer !== undefined) {
      initChoice(root);
    } else if (root.classList.contains("selfcheck")) {
      initSelfCheck(root);
    }
  }

  function initChoice(quiz) {
    var answer = quiz.dataset.answer.trim().toLowerCase();
    var opts = quiz.querySelectorAll(".quiz-opts li");
    var explain = quiz.querySelector(".quiz-explain");

    opts.forEach(function (li) {
      li.setAttribute("role", "button");
      li.setAttribute("tabindex", "0");

      function pick() {
        if (quiz.classList.contains("locked")) return;
        var key = (li.dataset.key || "").trim().toLowerCase();
        if (key === answer) {
          li.classList.add("correct");
          quiz.classList.add("locked");
          opts.forEach(function (o) { o.classList.remove("wrong"); });
          if (explain) explain.hidden = false;
        } else {
          li.classList.remove("wrong");
          // 强制重绘以重播抖动动画
          void li.offsetWidth;
          li.classList.add("wrong");
        }
      }

      li.addEventListener("click", pick);
      li.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          pick();
        }
      });
    });
  }

  function initSelfCheck(quiz) {
    var btn = quiz.querySelector(".quiz-reveal");
    var explain = quiz.querySelector(".quiz-explain");
    if (!btn || !explain) return;

    btn.addEventListener("click", function () {
      explain.hidden = false;
      btn.disabled = true;
      btn.style.opacity = "0.45";
      btn.textContent = "参考答案已展开";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quiz").forEach(initQuiz);
  });
})();
