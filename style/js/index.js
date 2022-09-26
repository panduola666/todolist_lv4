const uemail = document.querySelector('#uemail');
const upassword = document.querySelector('#upassword');
 const signIn = document.querySelector('.signIn');
 signIn.addEventListener('click',function(e){
    e.preventDefault()
    if(uemail.value,upassword.value==""){
        return alert('表單不能為空')
    }else{
    logn(uemail.value,upassword.value);
}
 })
function logn(email,password){
    axios.post('https://todoo.5xcamp.us/users/sign_in',{
        "user": {
            email,
            password
          }
    }).then(res=>{
        localStorage.setItem('token',res.headers.authorization);
        localStorage.setItem('nickname',res.data.nickname)
        alert(res.data.message);
        window.location.href='../../todolist.html';
    }).catch(err=>{
        alert('登入失敗!');
    })
}


