var font_family = $("#fontFamily");
var font_size =$("#fontSize");
var biaoti = $("#biaoti");
var family=[
    {
    text:"黑体",
    value:"黑体"
    },
    {
    text:"Arial",
    value:"Arial"
    },{
    text:"sans-serif",
    value:"sans-serif"    
     },{
    text:"monospace",
    value:"monospace"
    },{
    text:"Times New Roman",
    value:"Times New Roman"
    },{
    text:"宋体",
    value:"宋体"
    },{
    text:"幼圆",
    value:"YouYuan"
    },{
    text:"Serif",
    value:"Serif"
    },{
    text:"courier",
    value:"courier"
}];
var fontsize=[
    {
    text:"12px",
    value:'1'
},{
    text:"16px",
    value:'2'
},
{
    text:"18px",
    value:'3'      
},{
    text:"22px",
    value:'4'
},
{
    text:"24px",
    value:'5'
},
{
    text:"28px",
    value:'6'
},
{
    text:"32px",
    value:'7'
}
];
var biaoti_arr=[
    {text:'常规',value:''},
    {text:'一级标题',value:'H1'},
    {text:'二级标题',value:'H2'},
    {text:'三级标题',value:'H3'},
    {text:'四级标题',value:'H4'},
    {text:'五级标题',value:'H5'},
    {text:'六级标题',value:'H6'}

];
for(let i=0;i<biaoti_arr.length;i++){
    var html='<option value='+ biaoti_arr[i].value + '>'+biaoti_arr[i].text+'</option>'
    biaoti.append(html);
}
for(let i=0;i<family.length;i++){
    var html='<option value='+ family[i].value + '>'+family[i].text+'</option>'
    font_family.append(html);
}

for(var i=0;i<fontsize.length;i++){
    var html='<option value='+ fontsize[i].value+'>'+fontsize[i].text+'</option>'
    font_size.append(html);
}

var editor =document.getElementById("editor");
var boxes=[],nowImg,overlay;

editor.addEventListener('click', handleClick);
function handleClick(e){
    if (
        e.target &&
        e.target.tagName &&
        e.target.tagName.toUpperCase() === 'IMG'
    ) {
        handleClickImg(e.target);
    }else{
        
        $("#overlay").remove();
    }
   
}
function handleClickImg(img) {
    nowImg = img;
    console.log(nowImg);
    showOverlay();
};
function showOverlay() {
    // 添加蒙层
    overlay = document.createElement('div');
    overlay.setAttribute("id",'overlay');
    editor.appendChild(overlay);
    // 定位蒙层和大小
    repositionOverlay();
};
function repositionOverlay() {
    let imgRect = nowImg.getBoundingClientRect();
    let editorRect = editor.getBoundingClientRect();
    // 设置蒙层宽高和位置
    Object.assign(this.overlay.style, {
        position: 'absolute',
        top: `${imgRect.top - editorRect.top + this.editor.scrollTop}px`,
        left: `${imgRect.left -
          editorRect.left -
          1 +
          this.editor.scrollLeft}px`,
        width: `${imgRect.width}px`,
        height: `${imgRect.height}px`,
        boxSizing: 'border-box',
        border: '1px dashed grey'
    });
    // 添加四个顶点拖拽框
    createBox();
};
function createBox() {
    boxes = [];
    addBox('nwse-resize'); // top left
    addBox('nesw-resize'); // top right
    addBox('nwse-resize'); // bottom right
    addBox('nesw-resize'); // bottom left
    positionBoxes(); // 设置四个拖拽框位置
};
function addBox(cursor) {
    const box = document.createElement('div');
    Object.assign(box.style, {
        position: 'absolute',
        height: '10px',
        width: '10px',
        backgroundColor: 'white',
        border: '1px solid #777',
        boxSizing: 'border-box',
        opacity: '0.80'
    });
    box.style.cursor = cursor;
    box.addEventListener('mousedown', this.handleMousedown);  // 顺便添加事件
    overlay.appendChild(box);
    boxes.push(box);
};
function positionBoxes() {
    let handleXOffset = '-6px';
    let handleYOffset = '-6px';
    [{ left: handleXOffset, top: handleYOffset },
    { right: handleXOffset, top: handleYOffset },
    { right: handleXOffset, bottom: handleYOffset },
    { left: handleXOffset, bottom: handleYOffset }].forEach((pos, idx) => {
        Object.assign(boxes[idx].style, pos);
    });
};
var dragBox,dragStartX,preDragWidth;
function handleMousedown(e) {
    dragBox = e.target;
    dragStartX = e.clientX;
    preDragWidth = nowImg.width;
    setCursor(dragBox.style.cursor);
    document.addEventListener('mousemove',handleDrag);
    document.addEventListener('mouseup',handleMouseup);
};
function handleDrag(e) {
    
    // 计算水平拖动距离
    const deltaX = e.clientX - dragStartX;
    // 修改图片大小
    if (dragBox === boxes[0] || dragBox === boxes[3]) { // 左边的两个框
        nowImg.width = Math.round(preDragWidth - deltaX);
    } else { // 右边的两个框
       nowImg.width = Math.round(preDragWidth + deltaX);
    }
    // 同时修改蒙层大小
    repositionOverlay();
};
function handleMouseup() {
    setCursor('');
    // 拖拽结束移除事件监听
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseup);
};
function setCursor(value) {
    // 设置鼠标样式
    [document.body, nowImg].forEach(el => {

        el.style.cursor = value;
    });
}

$("#overlay").on('click',function(){
    alert("1");
    var thisNode=document.getElementById("overlay");
    thisNode.parentNode.removeNode(thisNode);
})
