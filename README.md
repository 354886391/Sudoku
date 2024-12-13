# Sudoku
 
棋盘 9x9 

LightPink = "#FFCBD5",  // 255,203,213
LightCyan = "#B2DFFE",  // 178,223,254
SlateGray = "#C4D7EA",  // 196,215,234
LightGold = "#FFEBCD",  // 255,235,205
LightGreen = "#B2F5B5", // 178,245,181
     Gray = "#E3EBF3",  // 227,235,243
    White = "#FFFFFF",  // 255,255,255
    Black = "#000000"   // 0,0,0

    click self
            blockBg  LightCyan  ("#B2DFFE")
            value    White      ("#FFFFFF")
        same
            blockBg  SlateGray  ("#C4D7EA")
            value    White      ("#FFFFFF")
        option
            blockBg  LightCyan  ("#B2DFFE")
            value    LightGreen (right "#B2F5B5"), LightPink    (fault "#FFCBD5")
        nonet "#E3EBF3"
        cross "#E3EBF3"
    click other
            blockBg "#B2DFFE"
