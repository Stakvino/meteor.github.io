const conférences_titles = document.querySelector("div.conférences-info > ul");
const speakers_container = document.querySelector("div.speakers-container");

speakers_container.addEventListener("click", e => {
  const speaker_item = e.target.closest("div.speaker-item");
  if(speaker_item && speaker_item.contains(e.target)){
    //change highlighted title
    const speaker_id = speaker_item.dataset["speaker_id"];
    const corespend_li = conférences_titles.querySelector(`li[data-speaker_id="${speaker_id}"]`);
    conférences_titles.querySelector("li.selected-conférence").classList.remove("selected-conférence");
    corespend_li.classList.add("selected-conférence");
    //change highlighted speaker
    speakers_container.querySelector("div.selected-speaker").classList.remove("selected-speaker");
    speaker_item.classList.add("selected-speaker");
  }
});