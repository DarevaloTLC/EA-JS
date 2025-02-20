function getUser(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    });
}

function getPosts(userId) {
  return fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener los posts");
      return response.json();
    });
}

function getComments(postId) {
  return fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener comentarios del post");
      return response.json();
    });
}

async function fetchUserData(userId) {
    try {
        const user = await getUser(userId);
        const posts = await getPosts(user.id);
        const comments = await Promise.all(posts.map(post => getComments(post.id)));
        /**
         * Promise.all() recibe un array de promesas y devuelve una promesa que se resuelve cuando todas las promesas del array se han resuelto.
         * En este caso, se resuelven todas las promesas de los comentarios de los posts.
         * await se usa para esperar a que se resuelva la promesa que devuelve Promise.all().
         * map se usa para recorrer el array de posts y obtener los comentarios de cada post.
         */

        // Funciones de alto nivel

        const postTitles = posts.map(post => post.title);
        const totalComments = comments.reduce((total, commentArray) => total + commentArray.length, 0);
        /**
         * reduce es una funcion que itera sobre cada elemento
         * del array 'comments' y aplica una funcion acumuladora.
         * Esta funcion acumuladora recibe dos parametros:
         *  - total: el valor acumulado hasta el momento
         *  - commentArray: el array de comentarios del post actual
         * En cada iteracion, se suma el numero de comentarios del post actual al total acumulado.
         * El segundo parametro de reduce es el valor inicial de total.
         */
        const filteredPosts = posts.filter(post => post.title.includes('qui'));
        /**
         * filter se usa para filtrar los posts cuyo título incluya la palabra 'qui'.
         */

        console.log('User:', user);	
        console.log('Post Titles:', postTitles);
        console.log('Total Comments:', totalComments);
        console.log('Filtered Posts:', filteredPosts);
    } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
    }

}

fetchUserData(1);