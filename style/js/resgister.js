const mytoken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMzk1Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjY0MDk2NDk5LCJleHAiOjE2NjUzOTI0OTksImp0aSI6ImZhNTIyM2NkLWViMDMtNGRmMy1iMzg1LTc5MjYyNzg2OTE1MyJ9.D6rYtnvNmms_ZgFwiwx563WPvO1HCyi8F8Ygi_rPUuM";
//Users
const url = "https://todoo.5xcamp.us";


const email = document.querySelector("#email");
const password = document.querySelector("#password");
const newUser = document.querySelector(".newUser");
const uname = document.querySelector("#uname");
const pw_check = document.querySelector("#pw_check");

newUser.addEventListener('click',function(e){
        e.preventDefault();
        if(email.value,uname.value,password.value,pw_check.value==""){
            alert('表單內容不可為空');
        }else if(password.value.length<6){
            alert('密碼過短,至少6位數')
        }
        else if(password.value!==pw_check.value){
            alert('兩次密碼不一致!');
        }else{
            addUser();
        
        }
    })
function addUser(){
    axios.post(`${url}/users`,{
        user: {
            email:email.value,
            nickname:uname.value,
            password:password.value,
        }
    }).then((res) => {
        console.log(res);
        alert('註冊成功!');
        window.location.href = "../../index.html";
        })
        .catch((err) =>{
            console.log(err);
            alert(`註冊失敗,${err.response.data.error}!`)
        } )
    }