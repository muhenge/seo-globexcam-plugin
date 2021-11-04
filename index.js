const baseUrl = 'https://api-seo.cloudhost.cm'

const apifetch = `${baseUrl}/api/seo/get-page-infos`


window.onload = async () => {
  const scr = document.querySelector('script[id="seo-plugin"]')
  const attr = scr.getAttribute('src')
  //const path = window.location.pathname;
  //const pageName = path.split("/").pop()
  const data = {
    app_key: attr.split('?')[1],
    //domain: window.location.hostname,
    domain: 'music.com',
    //page_url: pageName 
    page_url: '/Home'
  }

  console.log(data)

  let req = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }
 
  try {
    let get_project = await fetch(apifetch, req)
    jsonData = await get_project.json()
    console.log(jsonData.project)
  } catch (error) {
    console.log(req.message)
  }

  if (attr.includes(data.app_key) === true) {
    const desc = document.createElement('meta')
    const keywords = document.createElement('meta')
    const title = document.createElement('meta')
    const head = document.querySelector('head')
    // title.innerText = jsonData.project.meta_title
    keywords.setAttribute('name', 'keywords')
    keywords.setAttribute('content', jsonData.project.meta_keywords)
    desc.setAttribute('name', 'description')
    desc.setAttribute('content', jsonData.project.meta_description)
    title.setAttribute('name', 'title')
    title.setAttribute('content', jsonData.project.meta_title);
    head.appendChild(desc)
    head.appendChild(keywords)
    head.appendChild(title)
  } else {
    console.log('Verify key again')
  }
}




