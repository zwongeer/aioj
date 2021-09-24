<template>
  <ui-header title="help" translate>
    <ui-text text="help" />
  </ui-header>

  <ui-card v-for="(help, index) in helps" :key="index">
    <template #header>
      {{ help.title[i18n.lang] }}
    </template>
    <ui-content :text="help.content[i18n.lang]" markdown />
  </ui-card>
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { MyStore } from '../store';
import { defineComponent, toRefs } from 'vue';

const helps = [{
  title: {
    en_us: 'Welcome', zh_cn: '欢迎',
  },
  content: {
    en_us: `
Welcome to [aioj.ac](https://aioj.ac)! We strongly recommand you to read this manual before start using this website.
`,
    zh_cn: `
欢迎来到 [aioj.ac](https://aioj.ac)！我们墙裂建议您在使用网站前强细地阅读本使用手册。
`,
  },
}, {
  title: {
    en_us: 'User and files', zh_cn: '用户和文件',
  },
  content: {
    en_us: `
User can upload file onto this server and only used for study and commucation. Before upload any of your files onto our server, you must agree that we reserve the right to delete your file or redistrubute it without your agreement. We can promise that we will not made any commercial profits or abuse to your uploaded files.

In other words, do not upload your secret video or something weird (e.g. NSFW) content to our server, which may cause you be banned.

We support dynamic \`Content-Type\` header and even network stream for videos and audios uploaded to our server, so you can feel free to share your ideas without any limitaions.
`,
    zh_cn: `
用户可以将文件上传到本网站上用于学♂习和交♂流。但是在上传任何文件到我们的服务器之前，您必须同♂意我们保留未经您同意而删除您的文件或重新分配文件的权利。我们可以承诺，我们不会对您上传的文件进行任何商业盈利或滥♂用。

换句话说，不要上传你的秘♂密视频或一些奇♂怪的（比如 NSFW）内容到我们的服务器上，这可能会导致您被本站封♂禁。

我们的服务器支持动态的 \`Content-Type\` 头，支持对于视频和音频的网络串流播放，所以您可以在本站自♂由地分享您的想♂法而不收到任何限制。
`,
  },
}, {
  title: {
    en_us: 'Forum', zh_cn: '论坛',
  },
  content: {
    en_us: `
There is a forum for you to get in touch with other participants.

If you want to insert an image/video/audio in a post inline, you can just copy the code from your uploaded files page.

Some specific markdown code will be regard as video player or other, you don't need to learn it.
`,
    zh_cn: `
AIOJ 的论坛可以让您与其他选手亲切地交♂流。

如果你想在帖子中内嵌图片/视频/音频，你只需复制上传文件页面上的代码即可。

某些特定的 markdown 代码会经过特判，用以展示视频等在线功能。
`,
  },
}, {
  title: {
    en_us: 'Problems', zh_cn: '题库',
  },
  content: {
    en_us: `
This guide is written in both Chinese and English. If there is any inconsistency or conflict between English and Chinese version, the Chinese version shall prevail.

### For players

You can write your bot in the following programming languages:

- C++
- Python
- JavaScript
- ...

For each bot, 3 lines of parameters will be received from stdin during initialization：

* Number of players n
* The id to which you are assigned (maybe 1~n)
* The folder path to store data

When the main program (referee program) could determine the outcome of the game, the evaluation thread will send a string \`#kill\` to all bots and the referee, and then wait for a duration of a round before killing your bot process.

The following is a bot of gomoku to place piece randomly.

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
int a[19][19];
int me;
pair<int, int> getPosition() {
  int x = rand() % 19;
  int y = rand() % 19;
  while (a[x][y]) {
    x = rand() % 19;
    y = rand() % 19;
  }
  return make_pair(x, y);
}
int main() {
  srand(time(0));
  int playerNum;
  std::string path;
  cin >> playerNum >> me >> path;
  // initial game state is nothing
  while (true) {
    int player;
    cin >> player;
    if (player != me) {
      int x, y;
      cin >> x >> y;
      a[x][y] = 1;
    } else {
      pair<int, int> pr = getPosition();
      a[pr.first][pr.second] = 1;
      cout << pr.first << " " << pr.second << endl;
    }
  }
}
\`\`\`

**Submit code**

You can directly submit a single file, or a packed folder in the form of \`.zip\`。

The folder is required to contain a \`settings.json\` file, which contains the \`main\` field, and relative file name of the entry program.

### For the game maker

You may need to write a bunch of things

**Main program**

The main program is used to simulate the game process and make decisions in accordance with the rules of the game.

At the beginning of the main program, an integer will be entered from \`stdin\`, representing the number of players $n$, and all players will be numbered from $1$ to $n$.

On the next line, a string could be read from \`stdin\`, indicating the path that can be used to store data

Next, the main program shall output the initial situation of the game, and use a new line to indicate the end of the output.

Next, the reincarnation of the game starts. Every time it starts, output \`#continue %d\` and wrap the line, where \`%d\` represents the player id of the current turn of the operation.

Next, you can read in a line that represents the action made by the current player.

The format of the next read data like:
\`\`\`
Player \`id\` player's message
\`\`\`
Note that the id of this player must be the same as the parameter in the continue command, ~~ useless~~

Next, the main program determines whether the operation is appropriate and whether there is a winner in the game。

In addition, the main program may need to pass the output of one player to another player. In this case, the \`#send\` command can be used.

send
   - Consists of two lines
   
   - syntax:
   
   - The first line \`#send <list of player ids (separated by spaces)>\`
   
   - The second line \`<message to be sent to the corresponding player>\`
   
   - If there is only one number 0 in the player id list, a message will be sent to all players
   
   - In other cases, a message will be sent to the corresponding player. If the referee tries to send a message to a non-existent player, the evaluation thread will prompt an out_of_range, terminate the program, and record the error at the same time
   
   - examples：
   
   - \`\`\`
     #send 0
     hello //Send hello to all players, there should be no comments in the actual application, just for explanation
     \`\`\`
   
   - \`\`\`
     #send 1 2 3
     attack txdy //Send'attack txdy' to players with id 1, 2, 3
     \`\`\`

Note: The questioner should want to display the results on the web page, see [Drawing script](#Drawing script). In order to facilitate the questioner to read the game data, we also provide a \`#log\` command To help the questioner record the data

log
  - Consists of 2 lines

  - syntax:

  - \`\`\`
    #log
    <message to record>
    /*
    The content saved here can be used by the creator of the drawing script
    */
    \`\`\`

If there is a winner in the game, output \`#win %d\` followed by a new line, indicating that the player \`%d\` wins and the game is over.

If the game is tied, output \`#draw\` and start new line.

Note that after outputting \`#win\` or \`#draw\`, you need to output a line of player score list, and finally you can output a line of optional comments.

syntax：
\`\`\`
#win [List of player ids (separated by spaces, can be empty)]
<List of player scores (separated by spaces)>
[Comment (optional)]
\`\`\`

\`\`\`
#draw
<List of player scores (separated by spaces)>
[Comment (optional)]
\`\`\`
Similar to the win command, except no winning player

Equivalent to the \`#win\` command of no winning player

Otherwise, the game continues and returns to the beginning of the next round.

The following is the main program of gomoku, you can refer to it:

\`\`\`cpp
#include <bits/stdc++.h>
int board[19][19];
std::vector<std::pair<int, int>> p[2];
// initialize the game
void init() {
  memset(board, -1, sizeof board);
  p[0].clear();
  p[1].clear();
}
bool validate(int x, int y) {
  if (x < 0 || x >= 19)
    return false;
  if (y < 0 || y >= 19)
    return false;
  return board[x][y] == -1;
}
// 1: player 1 win | 2: player 2 win | -1: nobody win
int checkWin() {
  for (int i = 0; i < 15; ++i) {
    for (int j = 0; j < 15; ++j) {
      int one, two;
      // [-]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i][j + k] == 1;
        two += board[i][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [|]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + k][j] == 1;
        two += board[i + k][j] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [\]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + k][j + k] == 1;
        two += board[i + k][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [/]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + 4 - k][j + k] == 1;
        two += board[i + 4 - k][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
    }
  }
  return -1;
}

inline int switchPlayer(int p) {
  return p == 1 ? 2 : 1;
}
inline void winAndScore(int thewinner) {
  std::cout << "#win " << thewinner << std::endl;
  // score the players
  for (int i = 1; i <= 2; ++i) {
    if (i == thewinner)
      std::cout << "1 ";
    else
      std::cout << "0 ";
  }
  std::cout << std::endl;
  // give comments(optional)
  std::cout << "Good!" << std::endl;
}
int main(int argc, const char *argv[]) {
  init();
  int n = 0;
  std::string path;
  std::cin >> n;
  std::cin >> path;

  // assert(n == 2);
  std::cout << std::endl;
  int nowplayer = 1;
  std::cout << "#send " << nowplayer << std::endl;
  std::cout << nowplayer << std::endl;
  std::cout << "#continue " << nowplayer << std::endl;
  while (true) {
    // read player operation
    int playerId;
    int x, y;
    std::cin >> playerId >> x >> y;
    // validate the operation
    if (!validate(x, y)) {
      std::cout << "#log" << std::endl;
      std::cout << nowplayer << " " << x << " " << y << std::endl;
      winAndScore(switchPlayer(nowplayer));
      return 0;
    }
    // take the operation
    board[x][y] = nowplayer;

    p[nowplayer - 1].push_back(std::make_pair(x, y));
    // check if somebody wins
    int winner = checkWin();
    if (winner > -1) {
      std::cout << "#log" << std::endl;
      std::cout << nowplayer << " " << x << " " << y << std::endl;
      winAndScore(winner);
      return 0;
    }
    // check if ther e is no place to put chess anymore
    if (p[0].size() + p[1].size() == 19 * 19) {
      std::cout << "#draw" << std::endl;
      std::cout << "0 0" << std::endl;
      return 0;
    }
    // log the step
    std::cout << "#log" << std::endl;
    std::cout << nowplayer << " " << x << " " << y << std::endl;

    // send message to another player
    std::cout << "#send " << switchPlayer(nowplayer) << std::endl;
    std::cout << nowplayer << " " << x << " " << y << std::endl;

    // continue playing
    nowplayer = switchPlayer(nowplayer);
    std::cout << "#send " << nowplayer << std::endl;
    std::cout << nowplayer << std::endl;
    std::cout << "#continue " << nowplayer << std::endl;
  }
}
\`\`\`

### Drawing script

Next, a drawing script is needed to draw the battle situation into graphics on the front end.

A function needs to be exposed globally, accepting two parameters, \`ctx\` and \`ws\`, which are the CanvasContext object and the WebSocket object respectively.

For specific interfaces, please refer to the following Gobang drawing code:

\`\`\`js
;(() => {

let steps = [];

const scale = 0.5;

function draw(canvas, steps) {
  canvas.height = 1000 * scale;
  canvas.width = 1000 * scale;
  const ctx = canvas.getContext('2d');
  const bg = new Path2D();
  bg.rect(0, 0, 1000 * scale, 1000 * scale);
  ctx.fillStyle = '#f4b475';
  ctx.fill(bg);
  ctx.fillStyle = 'black';
  for (let i = 1; i <= 19; ++ i) {
    const line = new Path2D();
    line.moveTo(i * 50 * scale, 50 * scale);
    line.lineTo(i * 50 * scale, 19 * 50 * scale);
    ctx.stroke(line);

    const row = new Path2D();
    row.moveTo(50 * scale, i * 50 * scale);
    row.lineTo(19 * 50 * scale, i * 50 * scale);
    ctx.stroke(row);
  }

  steps.map(([id, x, y]) => {
    ctx.beginPath();
    ctx.arc((x + 1) * 50 * scale, (y + 1) * 50 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.fillStyle = id === 1 ? 'black' : 'white';
    ctx.fill();
  });

  if (steps.length > 0) {
    const [_, x, y] = steps[steps.length - 1];
    ctx.beginPath();
    ctx.arc((x + 1) * 50 * scale, (y + 1) * 50 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
  }
}

\/\/ expose here
window.__paint_script__ = (canvas, logs) => {
  console.log('hello world');
  steps = logs.trim().split('\n').map((line) => line.split(' ').map(Number));
  let now_step = 0;

  const update_canvas = () => {
    draw(canvas, steps.slice(0, now_step));
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0;
  slider.max = steps.length;
  slider.value = now_step;
  slider.addEventListener('input', () => {
    now_step = Number(slider.value);
    update_canvas();
  });

  const next_button = document.createElement('button');
  next_button.textContent = 'next >';
  next_button.addEventListener('click', () => {
    now_step = Math.min(now_step + 1, steps.length);
    slider.value = now_step;
    update_canvas();
  });

  const prev_button = document.createElement('button');
  prev_button.textContent = '< prev';
  prev_button.addEventListener('click', () => {
    now_step = Math.max(now_step - 1, 0);
    slider.value = now_step;
    update_canvas();
  });

  const end_button = document.createElement('button');
  end_button.textContent = 'end >>';
  end_button.addEventListener('click', () => {
    now_step = steps.length;
    slider.value = now_step;
    update_canvas();
  });

  const start_button = document.createElement('button');
  start_button.textContent = '<< start';
  start_button.addEventListener('click', () => {
    now_step = 0;
    slider.value = now_step;
    update_canvas();
  });

  canvas.parentElement.insertBefore(end_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(next_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(slider, canvas.nextSibling);
  canvas.parentElement.insertBefore(prev_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(start_button, canvas.nextSibling);

  canvas.style.display = 'block';

  update_canvas();
};

})();
\`\`\`
`,
    zh_cn: `

### 对于选手

您可以使用以下语言来书写您的 bot:

- C++
- Python
- JavaScript
- ...

对于每个 bot，所有所需要的信息将会从 stdin 输入，在初始化时会从stdin接受到3行参数：

* 玩家数量n
* 自己被分配到的id(可能为1~n)
* 可以用来储存数据的文件夹路径

当主程序（裁判程序）可以判定对局的胜负的时候，评测线程便会向所有 bot 和裁判发送一个字符串\`#kill\`，再等待一个回合的时间后 kill 掉您的 bot 线程。

以下是五子棋的随机下子 bot，可以参考。

\`\`\`cpp
#include <bits/stdc++.h>
using namespace std;
int a[19][19];
int me;
pair<int, int> getPosition() {
  int x = rand() % 19;
  int y = rand() % 19;
  while (a[x][y]) {
    x = rand() % 19;
    y = rand() % 19;
  }
  return make_pair(x, y);
}
int main() {
  srand(time(0));
  int playerNum;
  std::string path;
  cin >> playerNum >> me >> path;
  // initial game state is nothing
  while (true) {
    int player;
    cin >> player;
    if (player != me) {
      int x, y;
      cin >> x >> y;
      a[x][y] = 1;
    } else {
      pair<int, int> pr = getPosition();
      a[pr.first][pr.second] = 1;
      cout << pr.first << " " << pr.second << endl;
    }
  }
}
\`\`\`

**提交代码**

您可以直接提交单个文件，或者整个文件夹。

提交文件夹的时候请注意，请将文件夹打包成 \`.zip\` 的形式。

文件夹中需要包含一个 \`settings.json\` 文件，其中需要包含 \`main\` 字段，填写入口程序的相对文件名。

### 对于出题人

您可能需要写一堆东西

**主程序**

主程序用来模拟游戏过程以及按照游戏的规则做出判决。

主程序初始时将会从\`stdin\`输入一个整数，表示玩家的数量 $n$，所有玩家将会以 $1$ 到 $n$ 编号。

接下来一行，将会从\`stdin\`输入一个字符串，表示可以用来存资料的路径

接下来主程序需要输出游戏的初始局面，并以换行表示输出的结束。

接下来开始游戏的轮回，每次开始的时候输出 \`#continue %d\` 并换行，其中 \`%d\` 表示当前轮到操作的选手 id。

接下来可以读入一行，表示当前选手做出的操作。

接下来读入数据的格式类似与
\`\`\`
玩家id 玩家的消息
\`\`\`
注意这个玩家的id必定与continue命令中的参数相同，~~没啥用~~

接下来由主程序判断操作是否合法，以及游戏是否出现了胜者。

此外，主程序可能需要将一个玩家的输出结果传递给另外一个玩家，此时可以用到\`#send\`命令。

send
   - 由两行构成
   
   - 语法：
   
   - 第一行\`#send <玩家id列表（以空格分隔）>\`
   
   - 第二行\`<要发送给相应玩家的消息>\`
   
   - 如果玩家id列表中只有一个数字0，则会向所有玩家发送消息
   
   - 其它情况下，会向对应的玩家发送消息，如果裁判尝试向一个不存在的玩家发送消息，测评线程会提示一个out_of_range，并且终止程序，同时记录错误
   
   - 例子：
   
   - \`\`\`
     #send 0
     hello //向所有玩家发送hello，实际应用之中不应该有注释，此处只是说明
     \`\`\`
   
   - \`\`\`
     #send 1 2 3
     attack txdy //向id为1,2,3的玩家发送'attack txdy'
     \`\`\`

注意：出题者应该会希望在网页显示结果（见[绘图脚本](###绘图脚本)），为了方便出题者读取对局数据，我们还提供了一个\`#log\`命令来帮助出题人记录数据

log
  - 由2行构成

  - 语法：

  - \`\`\`
    #log
    <要记录的内容>
    /*
    这里保存的内容出题者可以在绘图脚本中使用
    */
    \`\`\`

如果游戏出现胜者，则输出 \`#win %d\` 并换行，表示选手 \`%d\` 胜出，游戏结束。

如果游戏平局，则输出 \`#draw\` 并换行。

注意，在输出\`#win\`或者\`#draw\`后需要再输出一行玩家的分数列表，最后还可以输出一行可选的评论。

语法如下：
\`\`\`
#win [玩家id列表（以空格分隔，可以为空）]
<玩家分数列表（以空格分隔）>
[评论（可选）]
\`\`\`

\`\`\`
#draw
<玩家分数列表（以空格分隔）>
[评论（可选）]
\`\`\`
和win命令类似，只不过没有胜利玩家

与没有胜利玩家的win命令等价

否则游戏继续进行，回到下一轮回的开始。

以下是五子棋的主程序，可以参考：

\`\`\`cpp
#include <bits/stdc++.h>
int board[19][19];
std::vector<std::pair<int, int>> p[2];
// initialize the game
void init() {
  memset(board, -1, sizeof board);
  p[0].clear();
  p[1].clear();
}
bool validate(int x, int y) {
  if (x < 0 || x >= 19)
    return false;
  if (y < 0 || y >= 19)
    return false;
  return board[x][y] == -1;
}
// 1: player 1 win | 2: player 2 win | -1: nobody win
int checkWin() {
  for (int i = 0; i < 15; ++i) {
    for (int j = 0; j < 15; ++j) {
      int one, two;
      // [-]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i][j + k] == 1;
        two += board[i][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [|]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + k][j] == 1;
        two += board[i + k][j] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [\]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + k][j + k] == 1;
        two += board[i + k][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
      // [/]
      one = two = 0;
      for (int k = 0; k < 5; ++k) {
        one += board[i + 4 - k][j + k] == 1;
        two += board[i + 4 - k][j + k] == 2;
      }
      if (one == 5)
        return 1;
      if (two == 5)
        return 2;
    }
  }
  return -1;
}

inline int switchPlayer(int p) {
  return p == 1 ? 2 : 1;
}
inline void winAndScore(int thewinner) {
  std::cout << "#win " << thewinner << std::endl;
  // score the players
  for (int i = 1; i <= 2; ++i) {
    if (i == thewinner)
      std::cout << "1 ";
    else
      std::cout << "0 ";
  }
  std::cout << std::endl;
  // give comments(optional)
  std::cout << "Good!" << std::endl;
}
int main(int argc, const char *argv[]) {
  init();
  int n = 0;
  std::string path;
  std::cin >> n;
  std::cin >> path;

  // assert(n == 2);
  std::cout << std::endl;
  int nowplayer = 1;
  std::cout << "#send " << nowplayer << std::endl;
  std::cout << nowplayer << std::endl;
  std::cout << "#continue " << nowplayer << std::endl;
  while (true) {
    // read player operation
    int playerId;
    int x, y;
    std::cin >> playerId >> x >> y;
    // validate the operation
    if (!validate(x, y)) {
      std::cout << "#log" << std::endl;
      std::cout << nowplayer << " " << x << " " << y << std::endl;
      winAndScore(switchPlayer(nowplayer));
      return 0;
    }
    // take the operation
    board[x][y] = nowplayer;

    p[nowplayer - 1].push_back(std::make_pair(x, y));
    // check if somebody wins
    int winner = checkWin();
    if (winner > -1) {
      std::cout << "#log" << std::endl;
      std::cout << nowplayer << " " << x << " " << y << std::endl;
      winAndScore(winner);
      return 0;
    }
    // check if ther e is no place to put chess anymore
    if (p[0].size() + p[1].size() == 19 * 19) {
      std::cout << "#draw" << std::endl;
      std::cout << "0 0" << std::endl;
      return 0;
    }
    // log the step
    std::cout << "#log" << std::endl;
    std::cout << nowplayer << " " << x << " " << y << std::endl;

    // send message to another player
    std::cout << "#send " << switchPlayer(nowplayer) << std::endl;
    std::cout << nowplayer << " " << x << " " << y << std::endl;

    // continue playing
    nowplayer = switchPlayer(nowplayer);
    std::cout << "#send " << nowplayer << std::endl;
    std::cout << nowplayer << std::endl;
    std::cout << "#continue " << nowplayer << std::endl;
  }
}
\`\`\`

### 绘图脚本

接下来需要一个绘图脚本来在前端将战局绘制成图形。

需要在全局中暴露一个函数，接受两个参数，\`ctx\` 和 \`ws\`，分别为 CanvasContext 对象和 WebSocket 对象。

具体接口请参考以下五子棋绘制代码：

\`\`\`js
;(() => {

let steps = [];

const scale = 0.5;

function draw(canvas, steps) {
  canvas.height = 1000 * scale;
  canvas.width = 1000 * scale;
  const ctx = canvas.getContext('2d');
  const bg = new Path2D();
  bg.rect(0, 0, 1000 * scale, 1000 * scale);
  ctx.fillStyle = '#f4b475';
  ctx.fill(bg);
  ctx.fillStyle = 'black';
  for (let i = 1; i <= 19; ++ i) {
    const line = new Path2D();
    line.moveTo(i * 50 * scale, 50 * scale);
    line.lineTo(i * 50 * scale, 19 * 50 * scale);
    ctx.stroke(line);

    const row = new Path2D();
    row.moveTo(50 * scale, i * 50 * scale);
    row.lineTo(19 * 50 * scale, i * 50 * scale);
    ctx.stroke(row);
  }

  steps.map(([id, x, y]) => {
    ctx.beginPath();
    ctx.arc((x + 1) * 50 * scale, (y + 1) * 50 * scale, 20 * scale, 0, Math.PI * 2);
    ctx.fillStyle = id === 1 ? 'black' : 'white';
    ctx.fill();
  });

  if (steps.length > 0) {
    const [_, x, y] = steps[steps.length - 1];
    ctx.beginPath();
    ctx.arc((x + 1) * 50 * scale, (y + 1) * 50 * scale, 4 * scale, 0, Math.PI * 2);
    ctx.fillStyle = '#ff0000';
    ctx.fill();
  }
}

\/\/ expose here
window.__paint_script__ = (canvas, logs) => {
  console.log('hello world');
  steps = logs.trim().split('\n').map((line) => line.split(' ').map(Number));
  let now_step = 0;

  const update_canvas = () => {
    draw(canvas, steps.slice(0, now_step));
  }

  const slider = document.createElement('input');
  slider.type = 'range';
  slider.min = 0;
  slider.max = steps.length;
  slider.value = now_step;
  slider.addEventListener('input', () => {
    now_step = Number(slider.value);
    update_canvas();
  });

  const next_button = document.createElement('button');
  next_button.textContent = 'next >';
  next_button.addEventListener('click', () => {
    now_step = Math.min(now_step + 1, steps.length);
    slider.value = now_step;
    update_canvas();
  });

  const prev_button = document.createElement('button');
  prev_button.textContent = '< prev';
  prev_button.addEventListener('click', () => {
    now_step = Math.max(now_step - 1, 0);
    slider.value = now_step;
    update_canvas();
  });

  const end_button = document.createElement('button');
  end_button.textContent = 'end >>';
  end_button.addEventListener('click', () => {
    now_step = steps.length;
    slider.value = now_step;
    update_canvas();
  });

  const start_button = document.createElement('button');
  start_button.textContent = '<< start';
  start_button.addEventListener('click', () => {
    now_step = 0;
    slider.value = now_step;
    update_canvas();
  });

  canvas.parentElement.insertBefore(end_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(next_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(slider, canvas.nextSibling);
  canvas.parentElement.insertBefore(prev_button, canvas.nextSibling);
  canvas.parentElement.insertBefore(start_button, canvas.nextSibling);

  canvas.style.display = 'block';

  update_canvas();
};

})();
\`\`\`
`,
  },
}];

export default defineComponent({
  setup() {
    const store = useStore() as MyStore;

    return {
      helps,
      ...toRefs(store.state),
    };
  },
});
</script>
