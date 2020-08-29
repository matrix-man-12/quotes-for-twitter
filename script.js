//Get quote from api
//http://api.forismatic.com/api/1.0/
//https://twitter.com/intent/Tweet



const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loader
function showLoadingSpinner(){
  loader.hidden = false;  //false means showing and true means to hide
  quoteContainer.hidden = true;
}

//hide loader
function stopLoadingSpinner(){
  if(!loader.hidden){
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// fetch quote from quote api
async function getQuote(){
  showLoadingSpinner();
  const proxyUrl='https://cors-anywhere.herokuapp.com/';
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try{
    const response=await fetch(proxyUrl + apiUrl);
    const data=await response.json();
    // console.log(data);
    if(data.quoteauthor===""){
      authorText.innerText="Unknown";
    }else{
      authorText.innerText=data.quoteAuthor;
    }
    if(data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    }else{
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText=data.quoteText;

    stopLoadingSpinner();

  }catch(error){
    getQuote();
    console.log("Error !!!" , error);
  }
}


// tweet the quote
function tweetquote(){
  const quote=quoteText.innerText;
  const author=authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl,'_blank');
}


//Evenlistener
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetquote);

//loading();
getQuote();
