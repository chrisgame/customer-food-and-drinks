export default function() {
  //Example dataset
  this.get('https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt', () => {
    return `
      {"latitude": "91", "user_id": 1, "name": "Alan Invalid", "longitude": "181"}
      {"latitude": "51.898656", "user_id": 2, "name": "Alice Cork", "longitude": "-8.482651"}
      {"latitude": "53.482160", "user_id": 3, "name": "Ian Drumraney", "longitude": "-7.749538"}
      {"latitude": "53.350539", "user_id": 4, "name": "Christina Dublin", "longitude": "-6.260125"}
    `.trim();
  });

  //Simulate formatting error
  //this.get('https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt', () => {
    //return `
      //{
    //`.trim();
  //});

  //Simulate Network Error
  //this.get('https://gist.githubusercontent.com/brianw/19896c50afa89ad4dec3/raw/6c11047887a03483c50017c1d451667fd62a53ca/gistfile1.txt', () => {}, 500);
}
