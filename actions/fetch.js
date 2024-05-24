const query = {};

export async function getTodoItem(api, element, active) {
  try {
    const queryString = Object.keys(query)
      ? `?${new URLSearchParams(query).toString()}`
      : "";

    const res = await fetch(api + queryString);

    if (!res.ok) throw new Error("Something went wrong");

    const data = await res.json();

    let html = data
      .map(
        (
          item
        ) => `<div class="mt-2.5 flex w-full items-center justify-between bg-white p-4 rounded-lg border border-gray-200 shadow">
      <span class="font-normal text-gray-700">${item.title}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-700 hover:bg-rose-800 focus:outline-none focus:ring-4 focus:ring-rose-300"
        >
         <i data-id=${
           item.id
         } class="btn-delete fa-regular fa-trash-can flex items-center justify-center"></i>
        </button>
        <button
        
          type="button"
          class="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
        <i  data-id=${
          item.id
        } class="btn-repair fa-solid fa-pen-to-square flex items-center justify-center"></i>
        </button>
        <button
          type="button"
          class="btn-success ${
            active ? `bg-emerald-700` : `bg-gray-400`
          } flex h-10 w-10 items-center justify-center rounded-lg hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-300"
        >
        <i  data-id=${item.id} data-title=${
          item.title
        } class="btn-success fa-regular fa-square-check flex items-center justify-center"></i>
         
        </button>
      </div>
    </div>`
      )
      .join("");

    element.innerHTML = html;
  } catch (err) {
    console.log(err);
  }
}

export async function sendRequestData(title, api, element, active) {
  const newData = { title: title };
  const res = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  if (!res.ok) throw new Error("Send data found!");

  getTodoItem(api, element, active);
  renderBtnCompleted();
}

export async function sendRequestDeleteData(id, element, API, active) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Send data found!");

  getTodoItem(API, element, active);
  renderBtnCompleted();
}

export async function sendRequestPatchData(id, title, element, API, active) {
  const res = await fetch(`${API}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(title),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("Send data found!");

  getTodoItem(API, element, active);
  renderBtnCompleted();
}
