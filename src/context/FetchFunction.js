import BaseStrig from './BaseURL'

const FetchFunction = async ({ url, data, metohd } = {}) => {
  
    if (metohd === 'get') {
      const query = await fetch(BaseStrig + url)
      .then(res => res.json())
      .then(res => res.message)
      .catch(error => console.log(error))

      return query

    } else if (metohd === 'post') {
      
      const mutation = await fetch(BaseStrig + url, {
        method: 'POST',
        headers: {
          'Contet-Type': 'aplication/json'
        },
        body: JSON.stringify(data)
      })
        .then(res => res.json())
        .then(res => res.message)
        .catch(err => console.log(err))

      return mutation
    }

}

export default FetchFunction