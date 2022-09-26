const url = "https://todoo.5xcamp.us";
const token = localStorage.getItem("token").replace("Bearer ", "").trim();
const headers = {
    headers: {
        Authorization: localStorage.getItem("token"),
    },
};
const signOut = document.querySelector(".signOut");
const addTODO = document.querySelector(".addTODO");
const addContent = document.querySelector(".TODO_content");
const uname = document.querySelector(".right span");
uname.textContent = localStorage.getItem("nickname");
const ul = document.querySelector("ul");
const clearAll = document.querySelector(".clearAll");
const finishALL = document.querySelector(".finish");

//登出
signOut.addEventListener("click", function () {
  axios
    .delete(`${url}/users/sign_out`, headers)
    .then((res) => {
      localStorage.removeItem("token");
      alert(res.data.message);
      window.location.href = "../../index.html";
    })
    .catch((err) => {
      console.log(err);
      alert(err.response.data.message);
    });
});


init();
addTODO.addEventListener("click", function (e) {
  axios
    .post(
      `${url}/todos`,
      {
        todo: {
          content: addContent.value,
        },
      },
      headers
    )
    .then((res) => {
      window.location.reload();
      addContent.value = "";
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
});

const choose = document.querySelectorAll("nav section");
choose.forEach((item) => {
  item.addEventListener("click", function () {
    choose.forEach((item) => item.classList.remove("active"));
    this.classList.add("active");
  });
});
choose[0].addEventListener("click", (e) => {
  init();
});


function init() {
  getTODO();
}

//頁面獲取
function getTODO() {
  axios(`${url}/todos`, headers)
    .then((res) => {
      const todosNUM = document.querySelector(".bottom span");
      todosNUM.textContent = 0;
      let str = "";
      let unfinished_STR = "";
      let finished_STR = "";
      const datas = res.data.todos;
      for (const k in datas) {
        let checked = datas[k].completed_at == null ? "" : "checked";
        if (datas[k].completed_at == null) {
          todosNUM.textContent++;
          unfinished_STR += `<li data-id="${datas[k].id}">
                            <label>
                                <input type="checkbox" class="checkbox">
                                <p>${datas[k].content}</p>
                            </label>
                            <div class="deleteTODO">
                                <i class="fi fi-br-cross"></i>
                            </div>
                        </li>`;
        } else {
          finished_STR += `<li data-id="${datas[k].id}">
                    <label>
                        <input type="checkbox" class="checkbox" checked>
                        <p>${datas[k].content}</p>
                    </label>
                    <div class="deleteTODO">
                        <i class="fi fi-br-cross"></i>
                    </div>
                </li>`;
        }
        str += `<li data-id="${datas[k].id}">
                    <label>
                        <input type="checkbox" class="checkbox" ${checked}>
                        <p>${datas[k].content}</p>
                    </label>
                    <div class="deleteTODO">
                        <i class="fi fi-br-cross"></i>
                    </div>
                </li>`;
      }
      ul.innerHTML = str;
      choose[1].addEventListener("click", () => {
        ul.innerHTML = unfinished_STR;
        lisOrder();
      });
      choose[2].addEventListener("click", () => {
        ul.innerHTML = finished_STR;
        lisOrder();
      });
      lisOrder();
 
      if (todosNUM.textContent == 0) {
        document.querySelector(".todolist").style.display = "none";
        finishALL.style.display = "block";
      }
      clearAll.addEventListener("click", () => {
        for (const k in datas) {
          if (datas[k].completed_at != null) {
            axios
              .delete(`${url}/todos/${datas[k].id}`, headers, {
                id: datas[k].id,
              })
              .then((res) => console.log("------"))
              .catch((err) => console.log(err));
          }
        }
        alert("已刪除完成項目!");
        window.location.reload();
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

//ul操作
function lisOrder() {
  const lis = document.querySelectorAll("li");
  lis.forEach((item) => {
    item.addEventListener("click", function (e) {
      if (e.target.nodeName == "INPUT") {
        axios
          .patch(
            `${url}/todos/${item.dataset.id}/toggle`,
            {
              id: item.dataset.id,
            },
            headers
          )
          .then((res) => {
            console.log(res.data.completed_at);
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
    const deleteTODO = item.querySelector(".deleteTODO");
    deleteTODO.addEventListener("click", function (e) {
      if (e.target.nodeName == "DIV") {
        axios
          .delete(`${url}/todos/${item.dataset.id}`, headers, {
            id: item.dataset.id,
          })
          .then((res) => {
            alert("刪除成功!");
            window.location.reload();
          })
          .catch((err) => console.log(err));
      }
    });
  });
}
