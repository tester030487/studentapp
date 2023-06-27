public Interface SongShuffleInterface {
    void setSongs(SongsDisplayHandler.Wrapper[] songs);
    SongsDisplayHandler.Wrapper[] getNextSong();
    SongsDisplayHandler.Wrapper[] peekQueue();
}