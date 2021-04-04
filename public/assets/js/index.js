const app = angular.module("main", [])



app.controller("main", ($scope, $http) => {

    $scope.project_data = [];
    $scope.age = new Date().getFullYear() - 2001;
    $scope.year = new Date().getFullYear();

    $scope.project = (n, e) => {
        e.preventDefault()

        let num = parseInt(n)

        $http({
            method: 'GET',
            url: './projects.json'
        }).then((res) => {
            let techs = document.getElementById("techs")
            let project_images = document.getElementById("p-slider-1")
            let project_preview_images = document.getElementById("for-project-slider")
            let desc = document.getElementById("project-desc")

            $scope.project_data = res.data.projects.find(m => m.id == num)

            if($scope.project_data){
                console.log($scope.project_data)
            
                techs.innerHTML = "";
                project_images.innerHTML = "";
                project_preview_images.innerHTML = "";
                desc.innerHTML = "";
    
                $(".notes").hide("fade", 10)

                $scope.project_data.images.forEach((x) => {
                    project_images.innerHTML += `<img src="${x.url}">`
                    project_preview_images.innerHTML += `<img src="${x.url}" class="preview-img" style="margin: 15px">`
                })

                $scope.project_data.notes.forEach((x) => {
                    desc.innerHTML += x
                })
    
                $scope.project_data.technologies.forEach((x) => {
                    techs.innerHTML += `
                    <div class="col-lg-4">
                        <div class="tech-card">
                            <div class="tech-card-title">
                                <div class="tech-img-group">
                                    <img src="${x.img}" class="tech-img" alt="">
                                </div>
                            </div>
                            <div class="tech-card-body">
                                <span class="tech-name">${x.name}</span>
                            </div>
                        </div>
                    </div>
                `
                })

                $("#p-slider-1").slick({
                    autoplay: true,
                    infinite: true,
                    variableWidth: false,
                    asNavFor: '#for-project-slider',
                    prevArrow: `<span class='prev'><i class="fas fa-angle-left"></i></span>`,
                    nextArrow: `<span class='next'><i class="fas fa-angle-right"></i></span>`
                })
                $("#for-project-slider").slick({
                    autoplay: true,
                    infinite: true,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    variableWidth: false,
                    asNavFor: "#p-slider-1",
                    prevArrow: `<span class='prev'><i class="fas fa-angle-left"></i></span>`,
                    nextArrow: `<span class='next'><i class="fas fa-angle-right"></i></span>`
                })

                //$(".cm-overlay").toggleClass("active")
                $("#projects").toggleClass("active")
                $("body").toggleClass("cm-active")
                $(".cm-close").toggleClass("active")
            }
            else{
                console.log("Project not exist")
            }
        })


    }

    $scope.contact = (e) => {
        let f = new FormData(e.target)
        $.ajax({
            url: "https://formspree.io/f/mbjqjdkj",
            data: f,
            method:  "POST",
            processData: false,
            contentType: false,
            success: () => {
                
                console.log("success")
            },
            error: (err) => {
                console.log(err)
            }
        })
    }

    $scope.close = (e) => {
        $("body").removeClass("cm-active")
        $(".cm-center").removeClass("active")
        $(".cm-close").toggleClass("active")
        $(".tab.details[data-tab=0]").trigger("click")
        setTimeout(() => {$("#p-slider-1").slick("unslick"), $("#for-project-slider").slick("unslick")}, 500)
    }
})