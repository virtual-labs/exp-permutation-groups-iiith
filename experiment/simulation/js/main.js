//Your JavaScript goes in here
let ClickId;
let ClickValue;
let x;
let y;
let test1;
let test2;
let test3;
let test4;
let InputArray;
let i;
let a;
let b;
let Aindex;
let Avalue;
let transition;
let cel1,cel2,cel3,cel4,cel5,cel6,cel7,cel8,cel9,cel10,cel11,cel12,cel13,cel14,cel15,cel16;
let moves=0;
let hi;
let li;
let step1=["-Locate tiles 1 and 2.","-Move the tiles so that the blank space is in the next position you want to move the tile to.","-Move the tile into the blank space.","-Repeat this process until tiles 1 and 2 are in the correct positions."]
let step2=["-Move tile 4 into tile 3's final position.","-Move tile 3 to be directly under tile 4.","-Move the blank square to the top right corner.","-Move tiles three and four like they are a snake so that they are both in their final positions."]
let step3=["-Locate tiles 5 and 6.","-Move tiles 5 and 6 to their final positions in a similar way that you moved tiles 1 and 2 into their final positions."]
let step4=["-Move tile 8 into the final position of tile 7.","-Move tile 7 to be directly under tile 8.","-Move the blank space to be on the right hand side of tile 8.","-Move tiles 8 and 7 like a snake into their final positions."]
let step5=["-Move tile 13 to be in tile 9's final position.","-Move tile 9 to be directly to the right of tile 13.","-Rotate the 5 tiles in the bottom left of the board counter clockwise like a snake until tiles 13 and 9 are in their final positions."]
let step6=["-Move tile 14 to the right of tile 9 so that it is in tile 10's final position.","-Move tile 10 to be directly to the right of tile 14.","-Rotate the three tiles in the middle two columns on the bottom two rows counter clockwise like a snake until tiles 14 and 10 are in their final positions."]
let step7=["-Rotate tiles 11, 12, and 15 either clockwise or counter clockwise until they are all in the correct positions"]
let start,b1,a1,discovered=[],inputArray2=[],index1Array=[],index2Array=[],index3Array=[],index4Array=[],index5Array=[],index6Array=[],index7Array=[];
let j1,i1,i11,permutaionParity,permNumber,work,corr,indexArrayMaker,hintnum;

document.getElementById("moves").innerHTML=`No. of moves = ${moves}`;
document.addEventListener('click', function(g) {
    ClickId = g.target.id;
    if(ClickId=="Generate"){
        function populate(){
        document.getElementById("c33").innerHTML="";
        document.getElementById("c00").innerHTML="";
        document.getElementById("c01").innerHTML="";
        InputArray=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        for(i=15;i>=1;){
            b=(i-1)%4;
            a=Math.floor((i-1)/4);
        Aindex = Math.floor(Math.random() * i);
        Avalue = InputArray[Aindex];
        if(i==1){
            if(Avalue==1){
            corr=document.getElementById('c01').innerHTML;
            document.getElementById('c00').innerHTML=corr;
            document.getElementById('c01').innerHTML=`${Avalue}`;
            InputArray.splice(Aindex, 1);
            i=i-1       
        }
    else{
        document.getElementById(`c${a}${b}`).innerHTML=`${Avalue}`;
        i=i-1;
    }}
        else if(Avalue !== i){
            document.getElementById(`c${a}${b}`).innerHTML=`${Avalue}`;
            InputArray.splice(Aindex, 1);
            i=i-1
        }
    }}
        function permGroups(){
            j1=0;
            discovered.length=0;
            index1Array.length=0;
            index2Array.length=0;
            index3Array.length=0;
            index4Array.length=0;
            index5Array.length=0;
            index6Array.length=0;
            index7Array.length=0;
        inputArray2=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        for(i1=0;discovered.length<15;){
            if(discovered.includes(inputArray2[i1])==false){
                start=inputArray2[i1];
                i11=0;
                    if(j1==0)
                    {
                        function cyclemaker(indexArrayMaker){
                        for(i11=0;i11<1;){
                        if(indexArrayMaker.includes(start)==true){
                        if(indexArrayMaker.length>=2){
                            j1=j1+1;
                            i1=0;
                            i11=1;
                        }
                        else{
                            indexArrayMaker.length=0;
                            i1=0;
                            i11=1;
                        }}
                        else{
                            indexArrayMaker.push(start);
                            discovered.push(start);
                            b1=(start-1)%4;
                            a1=Math.floor((start-1)/4);
                            start=parseInt(document.getElementById(`c${a1}${b1}`).innerHTML);
                    }}}
                cyclemaker(index1Array);}
                else if(j1==1)
                    {
                        cyclemaker(index2Array);
                       }
                else if(j1==2)
                    {
                        cyclemaker(index3Array);
                        }
                else if(j1==3)
                    {
                        cyclemaker(index4Array);
                      }
                else if(j1==4)
                    {
                        cyclemaker(index5Array);
                        }
                else if(j1==5)
                    {
                        cyclemaker(index6Array);
                       }
                else if(j1==6)
                    {
                        cyclemaker(index7Array);
                        }
            }
            else{
                i1=i1+1;
            }
        }}

       for(j11=0;j11<1;){
            populate();
            permGroups();
        permNumber=0;
if(index1Array.length>1){
    permNumber=permNumber+index1Array.length-1;
}
if(index2Array.length>1){
    permNumber=permNumber+index2Array.length-1;
}
if(index3Array.length>1){
    permNumber=permNumber+index3Array.length-1;
}
if(index4Array.length>1){
    permNumber=permNumber+index4Array.length-1;
}
if(index5Array.length>1){
    permNumber=permNumber+index5Array.length-1;
}
if(index6Array.length>1){
    permNumber=permNumber+index6Array.length-1;
}
if(index7Array.length>1){
    permNumber=permNumber+index7Array.length-1;
}
if(permNumber%2==0){
    console.log("even");
    j11=1;
}
else{
    console.log("odd"+permNumber%2)
}
}



document.addEventListener('click',e);
function e(){
    document.removeEventListener('click',e);
    setTimeout(function() {
        document.addEventListener('click',e);
    }, 260);
    document.addEventListener('click',function(idfun){
        ClickId = idfun.target.id;
    });

    if(ClickId=="Hints") {
        function hintfunction(hintnum){
            document.getElementById("hintTitle").innerHTML="Hint";
            document.getElementById("hintSteps").innerHTML="";
            for(hi=1;hi<=hintnum.length;){
            li=document.createElement('li');
            li.innerHTML=hintnum[hi-1];
            document.getElementById("hintSteps").appendChild(li); 
                hi=hi+1;
            }
        }
        if(document.getElementById("c00").innerHTML !=1 || document.getElementById("c01").innerHTML !=2){
          hintfunction(step1);
        }
        else if(document.getElementById("c02").innerHTML !=3 || document.getElementById("c01").innerHTML !=4){
          hintfunction(step2);
        }
        else if(document.getElementById("c10").innerHTML !=5 || document.getElementById("c11").innerHTML !=6){
          hintfunction(step3);
        }
        else if(document.getElementById("c12").innerHTML !=7 || document.getElementById("c13").innerHTML !=8){
          hintfunction(step4);
        }
        else if(document.getElementById("c30").innerHTML !=13 || document.getElementById("c20").innerHTML !=9){
          hintfunction(step5);
        }
        else if(document.getElementById("c31").innerHTML !=14 || document.getElementById("c21").innerHTML !=10){
          hintfunction(step6);
        }
        else if(document.getElementById("c22").innerHTML !=11 || document.getElementById("c23").innerHTML !=12 || document.getElementById("c32").innerHTML !=15){
          hintfunction(step7);
        }
        else{
            document.getElementById("hintTitle").innerHTML="Hint";
            document.getElementById("hintSteps").innerHTML="";
            }
    }

    function end(){
        document.getElementById("c00").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c01").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c02").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c03").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c10").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c11").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c12").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c13").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c20").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c21").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c22").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c23").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c30").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c31").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c32").style.backgroundColor="rgb(207,228,23)";
        document.getElementById("c33").style.backgroundColor="rgb(207,228,23)";
    }

    if(cel1==1 && cel2==2 && cel3==3 && cel4==4 && cel5==5 && cel6==6 && cel7==7 && cel8==8 && cel9==9 &&
        cel10==10 && cel11==11 && cel12==12 && cel13==13 && cel14==14 && cel15==15){
          end();
        }
        else{
            if(ClickId!=="c00" || ClickId!=="c01" || ClickId!=="c02" || ClickId!=="c03" || ClickId!=="c10" || ClickId!=="c11" || ClickId!=="c12"
            || ClickId!=="c13" || ClickId!=="c20" || ClickId!=="c21" || ClickId!=="c22" || ClickId!=="c23" || ClickId!=="c30" || ClickId!=="c31"
            || ClickId!=="c32" || ClickId!=="c33"){
                console.log("nope")
            }

    if(ClickId=="c00" || ClickId=="c01" || ClickId=="c02" || ClickId=="c03" || ClickId=="c10" || ClickId=="c11" || ClickId=="c12"
    || ClickId=="c13" || ClickId=="c20" || ClickId=="c21" || ClickId=="c22" || ClickId=="c23" || ClickId=="c30" || ClickId=="c31"
    || ClickId=="c32" || ClickId=="c33"){
        ClickValue=document.getElementById(ClickId).innerHTML
     y =  parseFloat(ClickId.charAt(1));
     x =  parseFloat(ClickId.charAt(2));

if(y+1<4){
    test1=document.getElementById(`c${y+1}${x}`).innerHTML;
    if(test1==""){
        moves = moves +1;
        document.getElementById("moves").innerHTML=`No. of moves = ${moves}`;
        document.getElementById(`c${y+1}${x}`).innerHTML=`${ClickValue}`;
        document.getElementById(`c${y+1}${x}`).style.visibility = "hidden"; 
        if(document.getElementById(`c${y+1}${x}`).innerHTML==((y+1)*4)+x+1){
            document.getElementById(ClickId).classList.add('YdownRed');
            transition= document.querySelector(".YdownRed")
        }
        else{ 
        document.getElementById(ClickId).classList.add('Ydown');
        transition= document.querySelector(".Ydown")
    }
        transition.addEventListener("transitionend",() =>{
        document.getElementById(ClickId).innerHTML="";
        document.getElementById(`c${y+1}${x}`).style.visibility = "visible";
        document.getElementById(ClickId).classList.remove('Ydown');
        document.getElementById(ClickId).classList.remove('YdownRed');
        document.getElementById(ClickId).classList.remove('boxyCel');
        document.getElementById(ClickId).classList.remove('boxyCelRed');
        if(document.getElementById(`c${y+1}${x}`).innerHTML==((y+1)*4)+x+1){
            document.getElementById(`c${y+1}${x}`).classList.add('boxyCelRed');
        }
        else{
            document.getElementById(`c${y+1}${x}`).classList.add('boxyCel');
        }
        });
    }
}
if(y-1>-1){
    test2=document.getElementById(`c${y-1}${x}`).innerHTML;
    if(test2==""){
        moves = moves +1;
        document.getElementById("moves").innerHTML=`No. of moves = ${moves}`;
        document.getElementById(`c${y-1}${x}`).innerHTML=`${ClickValue}`;
        document.getElementById(`c${y-1}${x}`).style.visibility = "hidden";
        if(document.getElementById(`c${y-1}${x}`).innerHTML==((y-1)*4)+x+1){
            document.getElementById(ClickId).classList.add('YupRed');
            transition= document.querySelector(".YupRed")
        }
        else{ 
        document.getElementById(ClickId).classList.add('Yup');
        transition= document.querySelector(".Yup")
    }
        transition.addEventListener("transitionend",() =>{
        document.getElementById(ClickId).innerHTML="";
        document.getElementById(`c${y-1}${x}`).style.visibility = "visible";
        document.getElementById(ClickId).classList.remove('Yup');
        document.getElementById(ClickId).classList.remove('YupRed');
        document.getElementById(ClickId).classList.remove('boxyCel');
        document.getElementById(ClickId).classList.remove('boxyCelRed');
        if(document.getElementById(`c${y-1}${x}`).innerHTML==((y-1)*4)+x+1){
            document.getElementById(`c${y-1}${x}`).classList.add('boxyCelRed');
        }
        else{
        document.getElementById(`c${y-1}${x}`).classList.add('boxyCel');
        }
    });
    }
}
if(x+1<4){
    test3=document.getElementById(`c${y}${x+1}`).innerHTML;
    if(test3==""){
        moves = moves +1;
        document.getElementById("moves").innerHTML=`No. of moves = ${moves}`;
        document.getElementById(`c${y}${x+1}`).innerHTML=`${ClickValue}`;
        document.getElementById(`c${y}${x+1}`).style.visibility = "hidden";
        if(document.getElementById(`c${y}${x+1}`).innerHTML==((y)*4)+x+2){
            document.getElementById(ClickId).classList.add('XrightRed');
            transition= document.querySelector(".XrightRed")
        }
        else{ 
        document.getElementById(ClickId).classList.add('Xright');
        transition= document.querySelector(".Xright")
    }
        transition.addEventListener("transitionend",() =>{
        document.getElementById(ClickId).innerHTML="";
        document.getElementById(`c${y}${x+1}`).style.visibility = "visible";
        document.getElementById(ClickId).classList.remove('Xright');
        document.getElementById(ClickId).classList.remove('XrightRed');
        document.getElementById(ClickId).classList.remove('boxyCel');
        document.getElementById(ClickId).classList.remove('boxyCelRed');
        if(document.getElementById(`c${y}${x+1}`).innerHTML==((y)*4)+x+2){
            document.getElementById(`c${y}${x+1}`).classList.add('boxyCelRed');
        }
        else{
        document.getElementById(`c${y}${x+1}`).classList.add('boxyCel');
        }
    });
    }
}
if(x-1>-1){
    test4=document.getElementById(`c${y}${x-1}`).innerHTML;
    if(test4==""){
        moves = moves +1;
        document.getElementById("moves").innerHTML=`No. of moves = ${moves}`;
        document.getElementById(`c${y}${x-1}`).innerHTML=`${ClickValue}`;
        document.getElementById(`c${y}${x-1}`).style.visibility = "hidden";
        if(document.getElementById(`c${y}${x-1}`).innerHTML==((y)*4)+x){
            document.getElementById(ClickId).classList.add('XleftRed');
            transition= document.querySelector(".XleftRed")
        }
        else{ 
        document.getElementById(ClickId).classList.add('Xleft');
        transition= document.querySelector(".Xleft")
    }
        transition.addEventListener("transitionend",() =>{
        document.getElementById(ClickId).innerHTML="";
        document.getElementById(`c${y}${x-1}`).style.visibility = "visible";
        document.getElementById(ClickId).classList.remove('Xleft');
        document.getElementById(ClickId).classList.remove('XleftRed');
        document.getElementById(ClickId).classList.remove('boxyCel');
        document.getElementById(ClickId).classList.remove('boxyCelRed');
        if(document.getElementById(`c${y}${x-1}`).innerHTML==((y)*4)+x){
            document.getElementById(`c${y}${x-1}`).classList.add('boxyCelRed');
        }
        else{
        document.getElementById(`c${y}${x-1}`).classList.add('boxyCel');
        }
    });
    }
}
cel1 = document.getElementById("c00").innerHTML;
cel2 = document.getElementById("c01").innerHTML;
cel3 = document.getElementById("c02").innerHTML;
cel4 = document.getElementById("c03").innerHTML;
cel5 = document.getElementById("c10").innerHTML;
cel6 = document.getElementById("c11").innerHTML;
cel7 = document.getElementById("c12").innerHTML;
cel8 = document.getElementById("c13").innerHTML;
cel9 = document.getElementById("c20").innerHTML;
cel10 = document.getElementById("c21").innerHTML;
cel11 = document.getElementById("c22").innerHTML;
cel12 = document.getElementById("c23").innerHTML;
cel13 = document.getElementById("c30").innerHTML;
cel14 = document.getElementById("c31").innerHTML;
cel15 = document.getElementById("c32").innerHTML;
cel16 = document.getElementById("c33").innerHTML;

if(cel1==1 && cel2==2 && cel3==3 && cel4==4 && cel5==5 && cel6==6 && cel7==7 && cel8==8 && cel9==9 &&
    cel10==10 && cel11==11 && cel12==12 && cel13==13 && cel14==14 && cel15==15){
        end();
    }
    }};
}}});

document.addEventListener('click', function(h) {
    if(document.getElementById("c00").innerHTML=="?"){
        ClickId = h.target.id;
        if(ClickId=="Hints"){
        document.getElementById("hintTitle").innerHTML="Click On Generate";
        document.getElementById("hintSteps").innerHTML="";
        }
    }
})