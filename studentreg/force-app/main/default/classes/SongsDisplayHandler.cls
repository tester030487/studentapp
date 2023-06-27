public class SongsDisplayHandler implements SongShuffleInterface{
    
    public void setSongs(Wrapper[] songs){}
    
    public Wrapper[] getNextSong(){
        return null;
    }
    public Wrapper[] peekQueue(){
        return null;
    }
    
    @AuraEnabled
    public static Wrapper fetchDetails(){
        
        List<Album__c> albumsList = [SELECT Id, Name, Author__c, Image__c,
                                    (SELECT Id, Album__c, Image__c, Title__c
                                     FROM Songs__r 
                                     WHERE InActive__c = false)
                                     FROM Album__c 
                                     WHERE InActive__c = false];

        Map<Id, List<Songs__c>> songMap = new Map<Id, List<Songs__c>>();         
        for(Album__c album: albumsList){  
            if(album.Songs__r != null && album.Songs__r.size() > 0){
                songMap.put(album.Id, album.Songs__r);  
            }else{
                songMap.put(album.Id, new List<Songs__c>());  
            }       
        }
        
        return new Wrapper(albumsList, songMap);
    }
    
    public class Wrapper{
        
        @AuraEnabled
        public List< Album__c > albumList;
        @AuraEnabled
        public Map<Id, List<Songs__c>> songMap;
        
        public Wrapper(List< Album__c > albumList, Map<Id, List<Songs__c>> songMap){
            
            this.albumList = albumList;
            this.songMap = songMap;   
            
        }
        
    }
    
}