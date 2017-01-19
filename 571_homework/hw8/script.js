// Code goes here
var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination']);

function MyController($scope,$http) {

    
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    //$scope.data = "";
    $scope.meals = [];
    //$scope.url = "http://localhost:8005/hw8/res.php";
    $scope.url = "http://quitz-env.us-west-2.elasticbeanstalk.com/";
    $scope.data = 'dbName=legislators';
    $scope.state_names = ['All States','Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];
    $scope.myvalue = true;
    $scope.myvalue1 = false;
    
    $scope.selectedName1 = "";
    $scope.page = 0;
    $scope.fpage = 0;
    $scope.sub_title = "Legislators By State";
    $scope.sub_title_bill = "Active Bills";
    $scope.sub_title_com = "House";
    $scope.sub_title_fav = "Favortite Legislators";
    //localStorage.setItem('test','try');
    $scope.fav_leg = JSON.parse(localStorage.getItem('fav_leg'));
    $scope.fav_bill = JSON.parse(localStorage.getItem('fav_bill'));
    $scope.fav_com = JSON.parse(localStorage.getItem('fav_com'));
    
    $scope.fav_leg_list = JSON.parse(localStorage.getItem('fav_leg_list'));
    $scope.fav_bill_list = JSON.parse(localStorage.getItem('fav_bill_list'));
    $scope.fav_com_list = JSON.parse(localStorage.getItem('fav_com_list'));
    
    var t=[];
    if(localStorage.getItem('legByState') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.district == null) {

                        d.district = 'N.A.';
                    }
                    else
                        d.district = "District " + d.district;

                    if(d.party == "R")
                        d.party ="r.png";
                    else
                        d.party = "d.png";

                    //var t = d.chamber;

                    if(d.chamber == "senate"){
                        d.chamber = "s.svg";
                        d.cm = "Senate";
                    }
                    else{
                        d.chamber = "h.png";
                        d.cm = "House";
                    }
                    t.push(d);

                });
                //alert(response.results.length);
                response.results.sort(sortRecord);
                $scope.meals = response.results;
                localStorage.setItem('legByState',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
        else{
            $scope.meals = JSON.parse(localStorage.getItem('legByState'));
        }

 
    $scope.state_name_update = function() {
        $scope.selectedName1 = $scope.selectedName;
        if($scope.selectedName == "All States")
            $scope.selectedName1 = "";
    };
    
  $scope.func1 = function() {
        $scope.myvalue = true;
        $scope.myvalue1 = false; 
        $scope.q = ""; 
        $scope.page = 0;
        //$scope.state_name_update();
        //alert($scope.selectedName1);
        $scope.selectedName = $scope.state_names[0];
        $("#leg1").addClass('active');
        $("#leg2").removeClass('active');
        $("#leg3").removeClass('active');
        $scope.legOrder = "['state_name','last_name']";
        //alert($scope.page);
        $scope.sub_title = "Legislators By State";
        $scope.data = 'dbName=legislators';
        
        
        if(localStorage.getItem('legByState') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.district == null) {

                        d.district = 'N.A.';
                    }
                    else
                        d.district = "District " + d.district;

                    if(d.party == "R")
                        d.party ="r.png";
                    else
                        d.party = "d.png";

                    //var t = d.chamber;

                    if(d.chamber == "senate"){
                        d.chamber = "s.svg";
                        d.cm = "Senate";
                    }
                    else{
                        d.chamber = "h.png";
                        d.cm = "House";
                    }

                });
                response.results.sort(sortRecord);
                $scope.meals = response.results;
                localStorage.setItem('legByState',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
        else{
            $scope.meals = JSON.parse(localStorage.getItem('legByState'));
        }
    };
    
  $scope.func2 = function() {
        $scope.myvalue = false;
        $scope.myvalue1 = true;
        $scope.selectedName1 = ""; 
        $scope.page = 0;
        
        $scope.sub_title = "Legislators By House";
        $scope.data = 'dbName=legislators&chamber=house';
        $scope.legOrder = "last_name";
        if(localStorage.getItem('legByHouse') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.district == null) {

                        d.district = 'N.A.';
                    }
                    else
                        d.district = "District " + d.district;

                    if(d.party == "R")
                        d.party ="r.png";
                    else
                        d.party = "d.png";

                    //var t = d.chamber;

                    if(d.chamber == "senate"){
                        d.chamber = "s.svg";
                        d.cm = "Senate";
                    }
                    else{
                        d.chamber = "h.png";
                        d.cm = "House";
                    }


                });
                
                response.results.sort(sortRecordByLast);
                $scope.meals = response.results;
                localStorage.setItem('legByHouse',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
      else{
          $scope.meals = JSON.parse(localStorage.getItem('legByHouse'));
      }
      
    };
    
    
    $scope.func3 = function() {
         $scope.myvalue = false;
        $scope.myvalue1 = true;
        $scope.selectedName1 = ""; 
        $scope.page = 0;
        
        $scope.sub_title = "Legislators By Senate";
        $scope.data = 'dbName=legislators&chamber=senate';
        $scope.legOrder = "last_name";
        if(localStorage.getItem('legBySenate') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.district == null) {

                        d.district = 'N.A.';
                    }
                    else
                        d.district = "District " + d.district;

                    if(d.party == "R")
                        d.party ="r.png";
                    else
                        d.party = "d.png";

                    //var t = d.chamber;

                    if(d.chamber == "senate"){
                        d.chamber = "s.svg";
                        d.cm = "Senate";
                    }
                    else{
                        d.chamber = "h.png";
                        d.cm = "House";
                    }


                });
                response.results.sort(sortRecordByLast);
                $scope.meals = response.results;
                localStorage.setItem('legBySenate',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
      else{
          $scope.meals = JSON.parse(localStorage.getItem('legBySenate'));
      }   
    };
    
  $scope.showDetails = function(id) {
      //alert(id);
      $("#myCarousel").carousel('next');
      content =" ";
      $scope.page = 0;
      pic = 'https://theunitedstates.io/images/congress/original/'+id+'.jpg';
      $.post($scope.url,
        {
                dbName:'id',
                kwName:id

        },
        function(data){
            //alert(1);
            showDetailInfo(data);
            judge();
        }
        );
      //console.log('meals page changed to ' + num);
  };
    
    $scope.showBillDetails = function(data) {
        $scope.page = 1;
        $("#myCarousel").carousel('next');
        var ht = "";
        ht +="<tr><td>Bill ID</td><td><span class='get_bill_id'>" + (data.bill_id).toUpperCase() + "</span></td></tr>";
        ht +="<tr><td>Title</td><td><span class='get_bill_title'>" + data.official_title + "</span></td></tr>";
        ht +="<tr><td>Bill Type</td><td><span class='get_bill_type'>" + (data.bill_type).toUpperCase() + "</span></td></tr>";
        ht +="<tr><td>Sponsor</td><td><span class='get_bill_sponsor_title'>" + vs(data.sponsor.tile) + '</span>,<span class="get_bill_sponsor_last_name">' + data.sponsor.last_name + '</span>,<span class="get_bill_sponsor_first_name">' + data.sponsor.first_name + "</span></td></tr>";
        ht +="<tr><td>Chamber</td><td></span><span class='get_bill_chamber'>" + data.chamber + "</td></tr>";
        if(data.history.active == false)
            ht +="<tr><td>Status</td><td>" + "New" + "</td></tr>";
        else
            ht +="<tr><td>Status</td><td>" + "Active" + "</td></tr>";
        
        ht +="<tr><td>Introduced On</td><td><span class='get_bill_introduced_on'>" + data.introduced_on + "</span></td></tr>";
        ht +="<tr><td>Congress URL</td><td><a target='_blank' href='" + data.urls.congress + "'>URL</td></tr>";
        
        if(data.last_version == null){
            data.last_version = {};
            data.last_version.version_name = 'N.A.';
            data.last_version.urls = {};
            data.last_version.urls.pdf = 'N.A.';
        }
            
            
        ht +="<tr><td>Version Status</td><td>" + data.last_version.version_name + "</td></tr>";
        ht +="<tr><td>Bill URL</td><td><a target='_blank' href='" + data.last_version.urls.pdf + "'>URL</td></tr>";
        
        ht +="<tr hidden><td><span class='get_bill_active'>" + data.history.active + "</span></td></tr>";
        ht +="<tr hidden><td><span class='get_bill_url'>" + data.last_version.urls.pdf + "</span></td></tr>";
        ht +="<tr hidden><td><span class='get_bill_congress'>" + data.urls.congress + "</span></td></tr>";
        
        $("#bill_table_info").html(ht);
        
        win_wid = $(window).width();
        fi = '<embed type="application/pdf" style="width:95%;height:100%" src="' + data.last_version.urls.pdf + '">';
        //alert(fi);
        if(win_wid>=992)
            $("#bill_1_div").html(fi);
        
        judge_bill();
    };
    
    
    function showDetailInfo(info){
        
        data = eval("(" + info + ")");
        //alert(data);
        //$scope.page = 0;
        var items = data['results'];
        var citems = data['results1'];
        var bitems = data['results2'];
        win_wid = $(window).width();
        if(win_wid>=992){
            content = '';
            pre = 'https://theunitedstates.io/images/congress/original/'; 
            for(var i=0;i<items.length;i++){
                content +="<tr><td rowspan=5 style='padding:0;margin:0;width:115px;height:185px;' class='get_pic'>";
                pic_pre = '<img style="width:100%;height:100%;padding:0;max-width:220px;max-height:220px" src="';
                pre += items[i]['bioguide_id'] + '.jpg';
                p = pic_pre + pre + '">'
                //p = p.toLowerCase();
                content += p + '</td><td>';
                content += items[i]['title'] +'.<span class="detail_name">' + items[i]['last_name'] + ',' + items[i]['first_name'] +'</span></td></tr>';
                content += '<tr><td><a href="mailto:' + vs(items[i]['oc_email']) +'">' +vs(items[i]['oc_email']) + '</td></tr>';
                content += '<tr><td>Chamber:<span class="get_chamber">' + titleCase(items[i]['chamber']) +'</span></td></tr>'; 
                content += '<tr><td>Phone: <span class="get_phone">' + vs(items[i]['phone']) +'</span></td></tr>';
                par = items[i]['party'];
                if(par == "R")
                    pc = '<img src="r.png" style="width:20px;height:20px;">Republican';
                else
                    pc = '<img src="d.png" style="width:20px;height:20px;">Democratic';
                content += '<tr><td>' + pc +'</td></tr>';
                
                content += '<tr><td>Start Term</td><td>' + items[i]['term_start'] + '</td></tr>';
                content += '<tr><td>End Term</td><td>' + items[i]['term_end'] + '</td></tr>';
                var tp = compareDate(items[i]['term_start'],items[i]['term_end'],'-');
                content += '<tr><td>Term</td><td><div id="pgbar" class="progress"><div class="progress-bar" role="progressbar" style="width:'+tp+'">'+tp+'</div></div>' + '</td></tr>';
                content += '<tr><td>Office</td><td>' + items[i]['office'] + '</td></tr>';
                content += '<tr><td>State</td><td><span class="get_state">' + items[i]['state_name'] + '</span></td></tr>';
                content += '<tr><td>Fax</td><td>' + vs(items[i]['fax']) + '</td></tr>';
                content += '<tr><td>Birthday</td><td>' + vs(items[i]['birthday']) + '</td></tr>';
                tw = 'http://twitter.com/' + items[i]['twitter_id'];
                fb = 'http://www.facebook.com/' + items[i]['facebook_id'];
                w = items[i]['website'];

                content += '<tr><td>Social Links</td><td><a target="_blank" href="'+tw + '"><img  style="width:10%" src="t.png"></a><a target="_blank" href="'+fb + '"><img src="f.png" style="width:10%"></a><a target="_blank" href="'+w +'"><img src="w.png" style="width:10%"></td></tr>';
                
                content += '<tr><td class="get_b_id" hidden>'+ items[i]['bioguide_id']+'</td></tr>';
                
                content += '<tr><td class="get_email" hidden>'+ vs(items[i]['oc_email'])+'</td></tr>';
                
                content += '<tr><td class="get_party" hidden>'+ items[i]['party'].toLowerCase()+'</td></tr>';


            }

           //document.getElementById('inner_table').innerHTML = content;
            $("#personal_info").html(content);


            content = '<tr><th>Chamber</th><th>Committee ID</th><th>Name</th></tr>';
            
            if(citems!=null){
                if(citems.length>5)
                    citems.length = 5;
                for(var i=0;i<citems.length;i++){
                content += '<tr><td style="width:20%">' + titleCase(citems[i]['chamber']) + '</td><td style="width:20%">' + citems[i]['committee_id'] + '</td><td style="width:60%">' + citems[i]['name'] + '</td></tr>';  

                }
            }
            $("#comm_info").html(content);

            content = '<tr><th style="width:10%">Bill ID</th><th style="width:60%">Title</th><th style="width:10%">Chamber</th><th style="width:5%">Bill Type</th><th style="width:10%">Cong- ress</th><th style="width:5%">Link</th></tr>';
            if(bitems!=null){
                if(bitems.length>5)
                    bitems.length = 5;
                for(var i=0;i<bitems.length;i++){
                    temp = bitems[i]['bill_id'];
                    ta = temp.substr(0,temp.search('-')+1);
                    tb = temp.substr(temp.search('-')+1);
                    t = ta + ' ' + tb;
                    var pdf;
                    if(bitems[i]['last_version'] == null || bitems[i]['last_version'] == null || bitems[i]['last_version']['urls'] == null  ){
                        pdf = 'N.A.';
                    }
                    else
                        pdf = bitems[i]['last_version']['urls']['pdf']
                    
                    content += '<tr><td>' + t + '</td><td>' + vs(bitems[i]['official_title']) + '</td><td>' + titleCase(bitems[i]['chamber']) +'</td><td>' + vs(bitems[i]['bill_type']) + '</td><td>' + vs(bitems[i]['congress']) +'</td><td><a target="_blank" href="' + vs(pdf)+'">Link</a></td></tr>';  
                }
            }
            $("#bill_info").html(content);
        }

        else{

            content = '';
            pre = 'https://theunitedstates.io/images/congress/original/'; 
            for(var i=0;i<items.length;i++){
                content +="<tr><td style='padding:0;margin:0;text-align:center'>";
                pic_pre = '<img style="width:100%;height:100%;padding:0;max-width:220px;max-height:220px" src="';
                pre += items[i]['bioguide_id'] + '.jpg';

                p = pic_pre + pre + '">'
                //p = p.toLowerCase();
                content += p + '</td></tr>';
                content += '<tr><td>' + items[i]['title'] +'.<span class="detail_name">' + items[i]['last_name'] + ',' + items[i]['first_name'] +'</span></td></tr>';
                
                content += '<tr><td><a href="mailto:' + vs(items[i]['oc_email']) +'">' +vs(items[i]['oc_email']) + '</td></tr>';
                
                content += '<tr><td><span class="get_chamber">' + titleCase(items[i]['chamber']) +'</span></td></tr>'; 
                content += '<tr><td><span class="get_phone">' + vs(items[i]['phone']) +'</span></td></tr>';
                par = items[i]['party'];
                //alert(par);
                if(par == "R")
                    pc = '<img src="r.png" style="width:20px;height:20px;">Republican';
                else
                    pc = '<img src="d.png" style="width:20px;height:20px;">Democratic';
                content += '<tr><td>' + pc +'</td></tr>';
                //alert(content);
                content += '<tr><td>' + items[i]['term_start'] + '</td></tr>';
                content += '<tr><td>' + items[i]['term_end'] + '</td></tr>';
                var tp = compareDate(items[i]['term_start'],items[i]['term_end'],'-');
                content += '<tr><td><div id="pgbar" class="progress"><div class="progress-bar" role="progressbar" style="width:'+tp+'">'+tp+'</div></div>' + '</td></tr>';

                content += '<tr><td>' + vs(items[i]['office']) + '</td></tr>';
                content += '<tr><td><span class="get_state">' + items[i]['state_name'] + '</span></td></tr>';
                content += '<tr><td>' + vs(items[i]['fax']) + '</td></tr>';
                content += '<tr><td>' + vs(items[i]['birthday']) + '</td></tr>';

                tw = 'http://twitter.com/' + items[i]['twitter_id'];
                fb = 'http://www.facebook.com/' + items[i]['facebook_id'];
                w = items[i]['website'];
                content += '<tr><td><a target="_blank" href="'+tw + '"><img  style="width:8%" src="t.png"></a><a target="_blank" href="'+fb + '"><img src="f.png" style="width:8%"></a><a target="_blank" href="'+w +'"><img src="w.png" style="width:8%"></td></tr>';
                
                content += '<tr><td class="get_b_id" hidden>'+ items[i]['bioguide_id']+'</td></tr>';
                content += '<tr><td class="get_email" hidden>'+ vs(items[i]['email'])+'</td></tr>';
                content += '<tr><td class="get_party" hidden>'+ items[i]['party'].toLowerCase()+'</td></tr>';


            }
            $("#personal_info").html(content);

            content = '<tr><th>Chamber</th><th>Committee ID</th></tr>';
            if(citems!=null){
                if(citems.length>5)
                    citems.length = 5;
                for(var i=0;i<citems.length;i++){
                    content += '<tr><td >' + titleCase(citems[i]['chamber']) + '</td><td >' + citems[i]['committee_id'] + '</td></tr>';  

                }
            }
            $("#comm_info").html(content);

            content = '<tr><th>Bill ID</th><th>Link</th></tr>';
            if(bitems!=null){
                if(bitems.length>5)
                    bitems.length = 5;
                for(var i=0;i<bitems.length;i++){
                    temp = bitems[i]['bill_id'];
                    var pdf;
                    if(bitems[i]['last_version'] == null || bitems[i]['last_version'] == null || bitems[i]['last_version']['urls'] == null  ){
                        pdf = 'N.A.';
                    }
                    else
                        pdf = bitems[i]['last_version']['urls']['pdf']
                        
                    content += '<tr><td>' + temp + '</td><td >'+'<a target="_blank" href="' +pdf +'">Link</a></td></tr>';  

                }
            }
            $("#bill_info").html(content);

        }

        //return 1;
    }
    
      $scope.showBillinfo = function() {
          
        $scope.page = 1;
        $scope.data = 'dbName=bills';
        $scope.sub_title_bill = "Active Bills";
        var res = [];
        $http({
            method: 'POST',
            url: $scope.url,
            data: $scope.data,  // pass in data as strings
            headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
        }).success(function (response) {
            $.each(response.results, function (i, d) {
                if(d.chamber == "house")
                    d.ci = "h.png";
                else
                    d.ci = "s.svg";
                d.chamber = titleCase(d.chamber);
                if(d.history.active == true){
                    res.push(d);
                }
            });
            $scope.meals = res;
            
            //raw_data = $scope.meals;   
        });
    };
    
    $scope.bill_func1 = function() {
        
        $scope.page = 1;
        $scope.data = 'dbName=bills&act=true';
        $scope.sub_title_bill = "Active Bills";
        $("#bill1").addClass('active');
        $("#bill2").removeClass('active');
        
        var res = [];
        
        if(localStorage.getItem('activeBill') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.chamber == "house")
                        d.ci = "h.png";
                    else
                        d.ci = "s.svg";
                    d.chamber = titleCase(d.chamber);
                });
                response.results.sort(sortRecordio);
                $scope.meals = response.results;
                localStorage.setItem('activeBill',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
        else{
            $scope.meals = JSON.parse(localStorage.getItem('activeBill'));
        }
    };
    
    $scope.bill_func2 = function() {
        
        $scope.page = 1;
        $scope.data = 'dbName=bills&act=false';
        $scope.sub_title_bill = "New Bills";
        var res = [];
        
        if(localStorage.getItem('newBill') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.chamber == "house")
                        d.ci = "h.png";
                    else
                        d.ci = "s.svg";
                    d.chamber = titleCase(d.chamber);
                     
                });
                response.results.sort(sortRecordio);
                $scope.meals = response.results;
                localStorage.setItem('newBill',JSON.stringify(response.results));
                //raw_data = $scope.meals;   
            });
        }
        else{
            $scope.meals = JSON.parse(localStorage.getItem('newBill'));
        }
    };
    
    
    $scope.com_func1 = function() {
        $scope.page = 2;
        $scope.data = 'dbName=committees';
        $scope.sub_title_com = "House";
        $("#com1").addClass('active');
        $("#com2").removeClass('active');
        $("#com3").removeClass('active');
        
        var res = [];
        if(localStorage.getItem('comByHouse') == null){
            
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.chamber == "house")
                        d.ci = "h.png";
                    else
                        d.ci = "s.svg";

                    d.chamber = titleCase(d.chamber);
                    d.parent_committee_id = vs(d.parent_committee_id);
                    d.phone = vs(d.phone);
                    d.office = vs(d.office);
                    d.color = "wh";
                    if(d.chamber == "House")
                        res.push(d);
                });      
                res.sort(sortRecordcid);
                $scope.meals = res;
                localStorage.setItem('comByHouse',JSON.stringify(res));  
            });
        }
        else{
            //alert(222);
            t = JSON.parse(localStorage.getItem('comByHouse'));
            //alert($scope.fav_com_list);
            //alert($scope.fav_com_list.length);
            if($scope.fav_com_list != null){
                for(var i=0;i<t.length;i++){
                    if($scope.fav_com_list.indexOf(t[i].committee_id)!=-1)
                        t[i].color = "yl";
                        //alert(i);
                    else
                        t[i].color = "wh";

                }
            }
            $scope.meals = t;
            localStorage.setItem('comByHouse',JSON.stringify(t));
            //$scope.meals = JSON.parse(localStorage.getItem('comByHouse'));
            
        }
    };
    
    
    
    $scope.com_func2= function() {
        
        $scope.page = 2;
        $scope.data = 'dbName=committees';
        $scope.sub_title_com = "Senate";
        var res = [];
        if(localStorage.getItem('comBySenate') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.chamber == "house")
                        d.ci = "h.png";
                    else
                        d.ci = "s.svg";

                    d.chamber = titleCase(d.chamber);
                    d.parent_committee_id = vs(d.parent_committee_id);
                    d.phone = vs(d.phone);
                    d.office = vs(d.office);
                    d.color = "wh";
                    if(d.chamber == "Senate")
                        res.push(d);
                    
                });
                res.sort(sortRecordcid);
                $scope.meals = res;
                localStorage.setItem('comBySenate',JSON.stringify(res));   
            });
        }
        else{
            t = JSON.parse(localStorage.getItem('comBySenate'));
            //alert($scope.fav_com_list);
            //alert($scope.fav_com_list.length);
            if($scope.fav_com_list != null){
                for(var i=0;i<t.length;i++){
                    if($scope.fav_com_list.indexOf(t[i].committee_id)!=-1)
                        t[i].color = "yl";
                        //alert(i);
                    else
                        t[i].color = "wh";

                }
            }
            localStorage.setItem('comBySenate',JSON.stringify(t));
            $scope.meals = JSON.parse(localStorage.getItem('comBySenate'));
        }
    };
    
    $scope.com_func3 = function() {
        
        $scope.page = 2;
        $scope.data = 'dbName=committees';
        $scope.sub_title_com = "Joint";
        var res = [];
        if(localStorage.getItem('comByJoint') == null){
            $http({
                method: 'POST',
                url: $scope.url,
                data: $scope.data,  // pass in data as strings
                headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}  
            }).success(function (response) {
                $.each(response.results, function (i, d) {
                    if(d.chamber == "house")
                        d.ci = "h.png";
                    else
                        d.ci = "s.svg";

                    d.chamber = titleCase(d.chamber);
                    d.parent_committee_id = vs(d.parent_committee_id);
                    d.phone = vs(d.phone);
                    d.office = vs(d.office);
                    d.color = "wh";
                    if(d.chamber == "Joint")
                        res.push(d);
                });
                res.sort(sortRecordcid);
                $scope.meals = res;
                localStorage.setItem('comByJoint',JSON.stringify(res));   
            });
        }
        else{
            t = JSON.parse(localStorage.getItem('comByJoint'));
            //alert($scope.fav_com_list);
            //alert($scope.fav_com_list.length);
            if($scope.fav_com_list != null){
                for(var i=0;i<t.length;i++){
                    if($scope.fav_com_list.indexOf(t[i].committee_id)!=-1)
                        t[i].color = "yl";
                        //alert(i);
                    else
                        t[i].color = "wh";

                }
            }
            localStorage.setItem('comByJoint',JSON.stringify(t));
            $scope.meals = JSON.parse(localStorage.getItem('comByJoint'));
        }
    };
    
    
    $scope.favor = function(t) {
        var s = "#" + t.committee_id;
        //alert(s);
        if($(s).hasClass('wh')){
            $(s).removeClass('wh');
            $(s).addClass('yl');
            
            fl = localStorage.getItem('fav_com');
            if(fl == null){
                a = []
                a.push(t);
                b = JSON.stringify(a);
                localStorage.setItem('fav_com',b);
            }
            else{
                f = JSON.parse(fl);
                f.push(t);
                b = JSON.stringify(f);
                localStorage.setItem('fav_com',b);
            }

            fll = localStorage.getItem('fav_com_list');

            if(fll == null){
                a = []
                a.push(t.committee_id);
                b = JSON.stringify(a);
                localStorage.setItem('fav_com_list',b);
            }
            else{
                f = JSON.parse(fll);
                f.push(t.committee_id);
                b = JSON.stringify(f);
                localStorage.setItem('fav_com_list',b);
            }

            //alert(JSON.parse(localStorage.getItem('fav_com_list')).length);
            $scope.fav_com = JSON.parse(localStorage.getItem('fav_com'));

            $scope.fav_com_list = JSON.parse(localStorage.getItem('fav_com_list'));

        }
        else{
            $(s).removeClass('yl');
            $(s).addClass('wh');
            
            tt = t.committee_id;
            fll = localStorage.getItem('fav_com_list');
            f = JSON.parse(fll);
            var i = f.indexOf(tt); 
            f.splice(i,1);
            b = JSON.stringify(f);
            localStorage.setItem('fav_com_list',b);

            $scope.fav_com_list = JSON.parse(localStorage.getItem('fav_com_list'));

            fl = localStorage.getItem('fav_com');
            f = JSON.parse(fl);
            f.splice(i,1);
            b = JSON.stringify(f);
            localStorage.setItem('fav_com',b);

            $scope.fav_com = JSON.parse(localStorage.getItem('fav_com'));
        }
    };
    
    $scope.fav_func1 = function() {
        $scope.page = 3;
        $scope.fpage = 0;
        $("#fav1").addClass('active');
        $("#fav2").removeClass('active');
        $("#fav3").removeClass('active');
        //alert(localStorage.getItem('test'));
    };
    
    $scope.fav_func2 = function() {
        $scope.page = 3;
        $scope.fpage = 1;
        //alert(localStorage.getItem('test'));
    };
    $scope.fav_func3 = function() {
        $scope.page = 3;
        $scope.fpage = 2;
        //alert(localStorage.getItem('test'));
    };
    
    $scope.cancel_favor = function(id) {
        t = id;
        fll = localStorage.getItem('fav_leg_list');
        f = JSON.parse(fll);
        var i = f.indexOf(t); 
        f.splice(i,1);
        b = JSON.stringify(f);
        localStorage.setItem('fav_leg_list',b);

        $scope.fav_leg_list = JSON.parse(localStorage.getItem('fav_leg_list'));

        fl = localStorage.getItem('fav_leg');
        f = JSON.parse(fl);
        f.splice(i,1);
        b = JSON.stringify(f);
        localStorage.setItem('fav_leg',b);

        $scope.fav_leg = JSON.parse(localStorage.getItem('fav_leg'));  
    };
    
    $scope.cancel_favor_bill = function(id) {
        t = id;
        
        fll = localStorage.getItem('fav_bill_list');
        f = JSON.parse(fll);
        var i = f.indexOf(t); 
        f.splice(i,1);
        
        b = JSON.stringify(f);
        localStorage.setItem('fav_bill_list',b);

        $scope.fav_bill_list = JSON.parse(localStorage.getItem('fav_bill_list'));

        fl = localStorage.getItem('fav_bill');
        f = JSON.parse(fl);
        f.splice(i,1);
        b = JSON.stringify(f);
        localStorage.setItem('fav_bill',b);

        $scope.fav_bill = JSON.parse(localStorage.getItem('fav_bill'));  
    };
    
    
    $scope.cancel_favor_com = function(id) {
        t = id;
        
        fll = localStorage.getItem('fav_com_list');
        f = JSON.parse(fll);
        var i = f.indexOf(t); 
        f.splice(i,1);
        
        b = JSON.stringify(f);
        localStorage.setItem('fav_com_list',b);

        $scope.fav_com_list = JSON.parse(localStorage.getItem('fav_com_list'));

        fl = localStorage.getItem('fav_com');
        f = JSON.parse(fl);
        f.splice(i,1);
        b = JSON.stringify(f);
        localStorage.setItem('fav_com',b);

        $scope.fav_com = JSON.parse(localStorage.getItem('fav_com'));  
    };
    
    
    function judge(){
        var t = $(".get_b_id").text();
        fl = JSON.parse(localStorage.getItem('fav_leg_list'));
        //alert(fl);
        if(fl!= null && fl.indexOf(t)!=-1){
            $("#favi").removeClass('wh');
            $("#favi").addClass('yl');
        }
    }
    
    function judge_bill(){
        var t = $(".get_bill_id").text();
        fl = JSON.parse(localStorage.getItem('fav_bill_list'));
        //alert(fl);
        if(fl!= null && fl.indexOf(t)!=-1){
            $("#favi").removeClass('wh');
            $("#favi").addClass('yl');
        }
    }
    
    $("#rev").click(function(){
        $("#myCarousel").carousel('prev');
        $scope.fpage = 0;
        if($("#favi").hasClass('yl')){
            $("#favi").removeClass('yl');
            $("#favi").addClass('wh');
        }
    });
    
    
    $("#favb").click(function(){
        
        if($("#favi").hasClass('wh')){        //likes
            $("#favi").removeClass('wh');
            $("#favi").addClass('yl');
            var t ={};
            if($scope.page == 0){      //legislators             
                t.name = $(".detail_name").text();
                t.bioguide_id = $(".get_b_id").text();
                t.email = $(".get_email").text();
                t.state = $(".get_state").text();
                t.chamber = $(".get_chamber").text();
                t.image = 'https://theunitedstates.io/images/congress/original/' + t.bioguide_id + '.jpg';
                if($(".get_party").text() == "r")
                    t.pi = "r.png";
                else
                    t.pi = "d.png";
                if(t.chamber == "House")
                    t.ci = "h.png"
                else
                    t.ci = "s.svg";

                fl = localStorage.getItem('fav_leg');
                if(fl == null){
                    a = []
                    a.push(t);
                    b = JSON.stringify(a);
                    localStorage.setItem('fav_leg',b);
                }
                else{
                    f = JSON.parse(fl);
                    f.push(t);
                    b = JSON.stringify(f);
                    localStorage.setItem('fav_leg',b);
                }

                fll = localStorage.getItem('fav_leg_list');

                if(fll == null){
                    a = []
                    a.push(t.bioguide_id);
                    b = JSON.stringify(a);
                    localStorage.setItem('fav_leg_list',b);
                }
                else{
                    f = JSON.parse(fll);
                    f.push(t.bioguide_id);
                    b = JSON.stringify(f);
                    localStorage.setItem('fav_leg_list',b);
                }
                
                //alert(JSON.parse(localStorage.getItem('fav_leg_list')).length);
                $scope.fav_leg = JSON.parse(localStorage.getItem('fav_leg'));
                
                $scope.fav_leg_list = JSON.parse(localStorage.getItem('fav_leg_list'));
                //alert(t.name);
            }
            else if($scope.page == 1){                              //bills
                var t ={};
                t.bill_id = $(".get_bill_id").text();
                t.official_title = $(".get_bill_title").text();
                t.bill_type = $(".get_bill_type").text();
                t.chamber = $(".get_bill_chamber").text();
                t.sponsor = {};
                t.sponsor.title = $(".get_bill_sponsor_title").text();
                t.sponsor.last_name = $(".get_bill_sponsor_last_name").text();
                t.sponsor.first_name = $(".get_bill_sponsor_first_name").text();
                t.introduced_on = $(".get_bill_introduced_on").text();
                t.urls = {};
                t.urls.congress = $(".get_bill_congress").text();
                t.last_version ={};
                t.last_version.urls = {};
                t.last_version.urls.pdf =$(".get_bill_url").text();  
                t.history ={};
                t.history.active = $(".get_bill_active").text(); 
                
                if(t.chamber == "House")
                    t.ci = "h.png";
                else
                    t.ci = "s.svg";
                
                
                fl = localStorage.getItem('fav_bill');
                if(fl == null){
                    a = []
                    a.push(t);
                    b = JSON.stringify(a);
                    localStorage.setItem('fav_bill',b);
                }
                else{
                    f = JSON.parse(fl);
                    f.push(t);
                    b = JSON.stringify(f);
                    localStorage.setItem('fav_bill',b);
                }

                fll = localStorage.getItem('fav_bill_list');

                if(fll == null){
                    a = []
                    a.push(t.bill_id);
                    b = JSON.stringify(a);
                    localStorage.setItem('fav_bill_list',b);
                }
                else{
                    f = JSON.parse(fll);
                    f.push(t.bill_id);
                    b = JSON.stringify(f);
                    localStorage.setItem('fav_bill_list',b);
                }
                
                //alert(JSON.parse(localStorage.getItem('fav_leg_list')).length);
                $scope.fav_bill = JSON.parse(localStorage.getItem('fav_bill'));
                
                $scope.fav_bill_list = JSON.parse(localStorage.getItem('fav_bill_list'));
                
            }
            else{
                
            }
            //to be done
        }
        else{
            $("#favi").removeClass('yl');         //dislike
            $("#favi").addClass('wh');
            
            if($scope.page == 0){
                t = $(".get_b_id").text();

                fll = localStorage.getItem('fav_leg_list');
                f = JSON.parse(fll);
                var i = f.indexOf(t); 
                f.splice(i,1);
                b = JSON.stringify(f);
                localStorage.setItem('fav_leg_list',b);

                $scope.fav_leg_list = JSON.parse(localStorage.getItem('fav_leg_list'));

                fl = localStorage.getItem('fav_leg');
                f = JSON.parse(fl);
                f.splice(i,1);
                b = JSON.stringify(f);
                localStorage.setItem('fav_leg',b);

                $scope.fav_leg = JSON.parse(localStorage.getItem('fav_leg'));
            }
            else if($scope.page == 1){
                t = $(".get_bill_id").text();
                fll = localStorage.getItem('fav_bill_list');
                f = JSON.parse(fll);
                var i = f.indexOf(t); 
                f.splice(i,1);
                b = JSON.stringify(f);
                localStorage.setItem('fav_bill_list',b);

                $scope.fav_bill_list = JSON.parse(localStorage.getItem('fav_bill_list'));

                fl = localStorage.getItem('fav_bill');
                f = JSON.parse(fl);
                f.splice(i,1);
                b = JSON.stringify(f);
                localStorage.setItem('fav_bill',b);

                $scope.fav_bill = JSON.parse(localStorage.getItem('fav_bill'));
            }
            else{
                
            }

        }
    });
    
    
    function titleCase(str){
            res=str.replace(/\b\w+\b/g, function(word){
                return word.substring(0,1).toUpperCase()+word.substring(1);}
            );
            return res;
        }
    
    function compareDate(first,second,sign){
            fArray = first.split(sign);
            sArray = second.split(sign);
            var fDate = new Date(fArray[0],fArray[1],fArray[2]);
            var sDate = new Date(sArray[0],sArray[1],sArray[2]);
            var cDate = new Date();
            var p = (cDate.getTime()-fDate.getTime())/(sDate.getTime()-fDate.getTime());
            p *=100;
            b = parseInt(p);
            //alert(b);
            return b+'%';
        }
    
    function sortRecord(a,b){
        if(a.state_name < b.state_name)
            return -1;
        else if(a.state_name > b.state_name)
            return 1;
        else{
            return sortRecordByLast(a,b);
        }
    }

    function sortRecordByLast(a,b){
        if(a.last_name < b.last_name)
            return -1;
        else if(a.last_name>b.last_name)
            return 1;
        return 0;
    }
    
    function sortRecordcid(a,b){
        if(a.committee_id < b.committee_id)
            return -1;
        else if(a.committee_id>b.committee_id)
            return 1;
        return 0;
    }
    
    function sortRecordio(a,b){
        if(a.introduced_on < b.introduced_on)
            return 1;
        else if(a.introduced_on>b.introduced_on)
            return -1;
        return 0;
    }
    
  $scope.pageChangeHandler = function(num) {
      //console.log('meals page changed to ' + num);
  };
    
    function vs(str){
        if(str == null)
            return 'N.A.';
        else
            return str;
    }  
}

function OtherController($scope) {
  $scope.pageChangeHandler = function(num) {
    //console.log('going to page ' + num);
  };
}

myApp.controller('MyController', MyController);
myApp.controller('OtherController', OtherController);