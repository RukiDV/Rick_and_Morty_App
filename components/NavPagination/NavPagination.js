export function create_pagination(page, maxPage)
{
  const pagination = document.createElement("span");
  pagination.classList.add("pagination");
  pagination.setAttribute("data-js", "pagination");
  pagination.textContent = `${page} / ${maxPage}`;
  return pagination;
}