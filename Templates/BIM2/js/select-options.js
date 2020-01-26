const select_options = document.querySelector("div.select-options")
const data_default_option = select_options.querySelector("div.data-default_option");
const ul = select_options.querySelector("ul");
data_default_option.addEventListener("click", e => {
  if(ul.classList.contains("hide")){
    ul.classList.remove("hide");
  }else{
    ul.classList.add("hide");
  }
})