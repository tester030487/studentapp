@isTest
private class SongsDisplayHandlerTest{
    
    static testmethod void executeRun(){
        
        Album__c album = new Album__c();
        album.Name = 'test';
        album.Author__c = 'test';
        insert album;
        
        Songs__c song = new Songs__c();
        song.Album__c = album.Id;
        song.Name = 'test';
        song.Title__c = 'test';
        insert song;
        
        SongsDisplayHandler.fetchDetails();
        new SongsDisplayHandler().getNextSong();
        new SongsDisplayHandler().peekQueue();
        new SongsDisplayHandler().setSongs(null);
        
    }
    
}