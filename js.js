let btn = document.createElement("button");
btn.innerText="click me!";
btn.style.backgroundColor="red";
btn.style.color="white";
let mode="white";
let bdy = document.querySelector("body");
bdy.prepend(btn);
function chg()

  {
    if(mode==="white")
    {
      mode="dark";
      bdy.style.backgroundColor="black";
    }

else{
    mode="white";
    bdy.style.backgroundColor="white";
}
}

btn.addEventListener("click",chg);


