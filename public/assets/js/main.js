(function (){
    eventListeners()
    //$("html, body").animate({ scrollTop: "0" })

    //

    observers()

    //

    typeText("Estudiante de desarrollo de sistemas", document.getElementById("title-sub-text"))
    
    //

    //
    setTimeout(() => {
        $(".brand-text").addClass("active")
    }, 1000)
}())



function eventListeners(){
    $("#databases").hide("fade", 10)
    $("#frameworks").hide("fade", 10)

    $(".title-text").show("bounce", 1000)

    $(document).scroll((e) => {
        if(window.pageYOffset >= 80){
            $(".custom-nav").addClass("slide") 
            $(".brand-group").addClass("slide")
            $(".brand-text").removeClass("active")
        }
        else{
            $(".brand-text").addClass("active")
            $(".custom-nav").removeClass("slide") 
            $(".brand-group").removeClass("slide") 
        }
    })

    $(".tab.skill").click((e) => {
        targetTab(e)
    })

    $(".tab.details").click((e) => {
        targetTab(e)
    })

    $("#cm-close").click(() => {
        //$(".cm-overlay").toggleClass("active")
        $(".cm").toggleClass("active")
        $("body").toggleClass("cm-active")
    })

    $(".cm-overlay").click(() => {
        //$(".cm-overlay").toggleClass("active")
        $(".cm").toggleClass("active")
        $("body").toggleClass("cm-active")
    })

    $("#test").click((e) => {
        //$(".cm").toggleClass("active")
        $(".cm-overlay").addClass("active")
        $("body").toggleClass("cm-active")
    })
}


function observers(){
    let skills = new IntersectionObserver(e => {
        if(e[0].isIntersecting){

            $(e[0].target).addClass("active")

            setTimeout(() => {
                skillsLoading("skill-python",30)
                skillsLoading("skill-java",50)
                skillsLoading("skill-c-plus",40)
                skillsLoading("skill-javascript",50)
                skillsLoading("skill-html-css",40)
                skillsLoading("skill-php",10)
            }, 500)
        }
    })

    skills.observe(document.getElementById("skills-content"))


    let projects = new IntersectionObserver(e => {
        if(e[0].isIntersecting){
            $(e[0].target).addClass("active")
            typeText("Estos son los proyectos que he realizado, conforme he ido estudiando y aprendiendo!", document.getElementById("projects-text"))
        }
    })

    projects.observe(document.getElementById("projects-content"))
}


function wait(ms){
    return new Promise(r => setTimeout(r, ms))
}

function targetTab(e){
    let tab = $(e.target).attr("data-tab")
    let tab_type = $(e.target).attr("data-tab-type")

    if(tab_type == "skill"){
        $(".tab.skill").removeClass("active")

        if(tab == "0"){
            $("#languages").show("fade")
            $("#databases").hide("fade", 10)
            $("#frameworks").hide("fade", 10)
        }
        else if(tab == "1"){
            $("#languages").hide("fade", 10)
            $("#frameworks").hide("fade", 10)
            $("#databases").show("fade")
        }
        else{
            $("#databases").hide("fade", 10)
            $("#languages").hide("fade", 10)
            $("#frameworks").show("fade")
        }
    }
    else if(tab_type == "project"){
        $(".tab.details").removeClass("active")

        if(tab == "0"){
            $(".technologies").show("fade")
            $(".notes").hide("fade", 10)
        }
        else{
            $(".technologies").hide("fade", 10)
            $(".notes").show("fade")
        }
    }

    $(e.target).addClass("active")
}

function openModal(e){
    let m = new bootstrap.Modal(document.getElementById("details-modal"), {})
    m.show()
}

async function typeText(text, target){
    let txt = text.split("")
    let t = ""
    for(let x = 0; x < txt.length; x++){
        t += txt[x]
        target.innerText = t;
        await wait(50)
    }
}

function skillsLoading(target, skill_percent = 30){
    let p = skill_percent
    $("#"+target).animate({"width":p + "%"}, 2000)
}


function projectsLoading(){
    let p = new IntersectionObserver(e => {
        alert("viendo :v")
    })

    p.observe(document.getElementById("projects"))

}