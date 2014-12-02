document.onmousedown=disableclick;
function disableclick(event)
{
  if(event.button==2)
   {
     return false;
   }
}
