({
    doInit : function(component, event, helper) {
        var limit = $A.get('$Label.c.ImageLimit');
        var action = component.get('c.fetchDetails');
        var albums = [];
        action.setCallback(this, function(a){
            var state = a.getState(); // get the response state
            if(state == 'SUCCESS') {
                var result = a.getReturnValue()
                component.set('v.albums', result.albumList);
                component.set('v.songMap', result.songMap);
                let count = 1;
                var record = result.albumList;
                var i;
                for(i=0; i<limit; i++){
                    albums.push(record[i]);
                }
                component.set('v.limitedAlbum', albums);
                component.set('v.count', limit);
            }
        });
        $A.enqueueAction(action);		
    },
    leftBtn : function(component, event, helper) {
        var limit = $A.get('$Label.c.ImageLimit');
        var albumList = component.get('v.albums');
        var count = component.get('v.count');
        var flag = count - limit;        
        if(flag > limit){
            var albums = [];
            var i;
            for(i = flag-1; i< count-1; i++){
                albums.push(albumList[i]);
            }
            component.set('v.limitedAlbum', albums);
            component.set('v.count', i); 
        }else{
            var record = albumList;
            var albums = [];
            var i;
            for(i=0; i<limit; i++){
                albums.push(record[i]);
            }
            component.set('v.limitedAlbum', albums);
            component.set('v.count', limit);            
        }
    },
    rightBtn : function(component, event, helper) {
        var limit = $A.get('$Label.c.ImageLimit');
        var count = component.get('v.count');
        var albumList = component.get('v.albums');
        if(count < albumList.length){
            var albums = [];
            var flag = 1;
            var i;
            for(i=count; i<albumList.length; i++){
                if(flag <= limit){
                    albums.push(albumList[i]);
                    flag = flag + 1;
                }else{
                    break;
                }
            }
            component.set('v.limitedAlbum', []);
            component.set('v.limitedAlbum', albums);
            component.set('v.count', i);             
        }        
    }, 
    selectedAlbum : function(component, event, helper) {
        component.set('v.showError', false);
        let albumId = event.target.id;
        if(albumId.includes('-')){
            albumId = albumId.split('-')[0]; 
        }
        var songMap = component.get('v.songMap');
        if(songMap.hasOwnProperty(albumId)){
            var songs = songMap[albumId];
            if(songs.length > 0){
                component.set('v.songs', Object.values(songs));  
            }else{
                component.set('v.songs', null);
                component.set('v.showError', true);
            }
        }
    },
    shuffleBtn : function(component, event, helper) {
        var limit = $A.get('$Label.c.ImageLimit');
        var albumList = component.get('v.albums');
        for (var i = albumList.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = albumList[i];
            albumList[i] = albumList[j];
            albumList[j] = temp;
        }
        var i;
        var albums = [];
        for(i=0; i<limit; i++){
            albums.push(albumList[i]);
        }
        component.set('v.albums', albumList);
        component.set('v.limitedAlbum', albums);
        component.set('v.count', limit);       
        
    },
    shuffleSongs : function(component, event, helper) {
        var songs = component.get('v.songs');
        if(songs.length > 0){
            component.set('v.songs', []);           
            for (var i = songs.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = songs[i];
                songs[i] = songs[j];
                songs[j] = temp;
            }
            component.set('v.songs', songs);            
        }
    }
})