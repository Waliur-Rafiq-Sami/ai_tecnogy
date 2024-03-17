// Typing Effiect StaRtS
const words = [
  "As-salamu alaykum!",
  "Welcome to my website!",
  "I am Waliur Rafiq SAMI",
];
let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function type() {
  currentWord = words[i];
  if (isDeleting) {
    document.getElementById("typewriter").textContent = currentWord.substring(
      0,
      j - 1
    );
    j--;
    if (j == 0) {
      isDeleting = false;
      i++;
      if (i == words.length) {
        i = 0;
      }
    }
  } else {
    document.getElementById("typewriter").textContent = currentWord.substring(
      0,
      j + 1
    );
    j++;
    if (j == currentWord.length) {
      isDeleting = true;
    }
  }
  setTimeout(type, 100);
}

type();
// Typing Effiect eNd

// collect data use api
const data = "https://openapi.programming-hero.com/api/ai/tools";
const collectData = () => {
  fetch(data)
    .then((Response) => Response.json())
    .then((data) => displaySetting(data));
};
collectData();
// display setting
const displaySetting = (AllData) => {
  const data = AllData.data.tools;
  const divContainer = document.getElementById("AI_Universe_Hub_Container");
  data.forEach((data) => {
    const CreatAdiv = document.createElement("div");
    CreatAdiv.classList = `card bg-gray-100 shadow-xl p-5 border-2 rounded-2xl border-gray-200`;
    CreatAdiv.innerHTML = `     
                <figure>
                  <img
                    src="${data?.image || "Sorry! Image Not Found"}"
                    alt=" Sorry! Image Not Found"
                  />
                </figure>
                <div class="mt-5 border-b-2 pb-5 border-gray-300">
                  <h2 class="font-bold text-2xl pb-3">Features :</h2>
                  <ol class="list-decimal pl-7 text-lg">
                    <li>${data?.features[0]}</li>
                    <li>${data?.features[1]}</li>
                    <li>${data?.features[2]}</li>
                  </ol>
                </div>
                <div class="card-actions justify-between items-center py-5">
                  <div>
                    <h1 class="font-bold text-2xl mb-2">${data?.name}</h1>
                    <p>
                      <i class="fa-solid fa-calendar-days pr-1 text-lg"></i>
                      ${data?.published_in}
                    </p>
                  </div>
                  <div>
                    <button
                    onclick ="getInfo('${data?.id}')";
                      class="btn bg-red-200 rounded-full text-red-600 text-base"
                    >
                      <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>
                </div>
                
        `;
    divContainer.appendChild(CreatAdiv);
  });
};

// display show on screen

//Show Modal Container
const getInfo = (id) => {
  const getId = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const info = fetch(getId)
    .then((Response) => Response.json())
    .then((data) => {
      getInfoDitals(data, id);
    });
};

function getInfoDitals(data, id) {
  const aiUniverseHubModal = document.getElementById("AI_Universe_Hub_modal");
  const ditalsInfo = data.data;
  console.log(ditalsInfo);
  console.log(id);
  if (ditalsInfo.id === id) {
    aiUniverseHubModal.innerHTML = `
  <dialog id="showModal" class="modal">
            <div class="modal-box w-11/12 max-w-5xl">
              <form method="dialog">
                <button
                  class="btn text-xl rounded-full font-bold btn-ghost absolute right-1 top-1 text-white bg-red-500"
                >
                  ✕
                </button>
              </form>
              <!-- container  -->
              <div class="flex gap-5 flex-col-reverse lg:flex-row">
                <!-- side 1 -->
                <div
                  class="flex-1 border-2 rounded-3xl p-5 bg-[#ffe9e99d] border-red-300 flex flex-col gap-5"
                >
                  <h1 class="font-bold md:text-2xl">
                   ${ditalsInfo?.description}
                  </h1>
                  <div
                    class="flex flex-col md:flex-row justify-around text-center gap-5"
                  >
                    <div class="p-5 text-green-500 bg-white rounded-3xl">
                      ${ditalsInfo?.pricing[0]?.price}</br>${ditalsInfo?.pricing[0]?.plan}                      
                    </div>
                    <div class="p-5 text-orange-500 bg-white rounded-3xl">
                       ${ditalsInfo?.pricing[1].price}</br>${ditalsInfo?.pricing[1].plan}
                    </div>
                    <div class="p-5 text-red-500 bg-white rounded-3xl">
                       ${ditalsInfo?.pricing[2].price}</br>${ditalsInfo?.pricing[2].plan}
                    </div>
                  </div>
                  <div class="flex flex-col md:flex-row gap-2 md:gap-20">
                    <div>
                      <h1 class="text-2xl font-bold">Features</h1>
                      <ul class="list-disc ml-7 mt-1">
                        <li>${ditalsInfo?.features?.[1].feature_name}</li>
                        <li>${ditalsInfo?.features?.[2].feature_name}</li>
                        <li>${ditalsInfo?.features?.[3].feature_name}</li>
                      </ul>
                    </div>
                    <div>
                      <div>
                        <h1 class="text-2xl font-bold">Integrations</h1>
                        <ul class="list-disc ml-7 mt-1">
                          <li>${ditalsInfo?.integrations[0]}</li>
                          <li>${ditalsInfo?.integrations[1]}</li>
                          <li>${ditalsInfo?.integrations[2]}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- side 2-->
                <div class="flex-1 border-2 md:p-5 p-2 rounded-3xl">
                  <div class="flex flex-col gap-5">
                    <img
                      class="rounded-xl"
                      src=" ${ditalsInfo?.image_link[0]}"
                      alt=""
                    />
                    <div class="flex flex-col gap-1 ">
                      <h1 class="md:text-2xl text-xl font-bold">
                        ${ditalsInfo?.input_output_examples[0]?.input}
                      </h1>
                      <p class="">
                       ${ditalsInfo?.input_output_examples[0]?.output}

                      </p>
                    </div>
                     <div class="flex flex-col gap-1 ">
                      <h1 class="md:text-2xl text-xl font-bold">
                        ${ditalsInfo?.input_output_examples[1]?.input}
                      </h1>
                      <p class="">
                       ${ditalsInfo?.input_output_examples[1]?.output}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
  `;
  }

  showModal.showModal();
}
