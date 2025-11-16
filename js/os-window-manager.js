console.log('✅ JavaScript文件加载成功！');

class WindowManager {
    constructor() {
        this.windows = new Map();
        this.taskbarApps = new Map();
        this.zIndexCounter = 100;
        this.init();
    }

    init() {
        console.log('🚀 窗口管理器初始化...');
        this.setupEventListeners();
        this.updateTime();
        console.log('✅ 窗口管理器初始化完成');
    }

    setupEventListeners() {
        console.log('🔗 设置事件监听器...');

        const startBtn = document.querySelector('.start-menu-btn');
        if (startBtn) {
            startBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleStartMenu();
            });
        }

        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                const app = icon.dataset.app;
                console.log('🖱️ 点击桌面图标:', app);
                this.openApp(app);
            });
        });

        document.querySelectorAll('.app-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const app = item.dataset.app;
                console.log('🖱️ 开始菜单点击:', app);
                this.openApp(app);
                this.closeStartMenu();
            });
        });

        document.addEventListener('click', () => {
            this.closeStartMenu();
        });

        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        const powerBtn = document.querySelector('.power-options');
        if (powerBtn) {
            powerBtn.addEventListener('click', () => {
                this.showShutdownDialog();
            });
        }
    }

    toggleStartMenu() {
        const startMenu = document.querySelector('.start-menu');
        if (startMenu) {
            startMenu.classList.toggle('active');
        }
    }

    closeStartMenu() {
        const startMenu = document.querySelector('.start-menu');
        if (startMenu) {
            startMenu.classList.remove('active');
        }
    }

    openApp(appName) {
        console.log('📱 打开应用:', appName);

        for (let [windowId, window] of this.windows) {
            if (window.app === appName && window.isMinimized) {
                this.restoreWindow(windowId);
                return;
            }
        }
        
        const windowId = 'window-' + appName + '-' + Date.now();
        const content = this.getAppContent(appName);
        
        this.createWindow({
            id: windowId,
            title: this.getAppTitle(appName),
            content: content,
            app: appName,
            position: { x: 100 + (this.windows.size * 30), y: 100 + (this.windows.size * 30) },
            size: { width: 800, height: 600 }
        });
    }

    getAppTitle(appName) {
        const titles = {
            computer: '此电脑',
            user: '用户信息',
            projects: '项目作品',
            browser: '浏览器',
            utilities: '实用工具',
            blog: '博客文章'
        };
        return titles[appName] || appName;
    }

    getAppContent(appName) {
        const contents = {
            computer: this.getComputerContent(),
            user: this.getUserContent(),
            projects: this.getProjectsContent(),
            browser: this.getBrowserContent(),
            utilities: this.getUtilitiesContent(),
            blog: this.getBlogContent()
        };
        return contents[appName] || '<div style="padding: 20px;"><p>' + appName + ' 应用内容</p></div>';
    }

    getComputerContent() {
        return `
            <div style="padding: 20px;">
                <h2>💻 此电脑</h2>
                <div style="margin-top: 20px;">
                    <div style="display: flex; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; cursor: pointer;">
                        <span style="font-size: 32px; margin-right: 15px;">📀</span>
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">本地磁盘 (C:)</div>
                            <div style="color: #666; font-size: 14px;">系统文件 - 剩余 128 GB / 256 GB</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; padding: 15px; background: #f8f9fa; border-radius: 8px; margin-bottom: 10px; cursor: pointer;">
                        <span style="font-size: 32px; margin-right: 15px;">💾</span>
                        <div style="flex: 1;">
                            <div style="font-weight: bold; font-size: 16px;">文档 (D:)</div>
                            <div style="color: #666; font-size: 14px;">个人文件 - 剩余 89 GB / 128 GB</div>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3>快速访问</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-top: 15px;">
                        <div style="display: flex; align-items: center; padding: 12px; background: #e9ecef; border-radius: 6px; cursor: pointer;">
                            <span style="font-size: 24px; margin-right: 10px;">📁</span>
                            <span>文档</span>
                        </div>
                        <div style="display: flex; align-items: center; padding: 12px; background: #e9ecef; border-radius: 6px; cursor: pointer;">
                            <span style="font-size: 24px; margin-right: 10px;">🖼️</span>
                            <span>图片</span>
                        </div>
                        <div style="display: flex; align-items: center; padding: 12px; background: #e9ecef; border-radius: 6px; cursor: pointer;">
                            <span style="font-size: 24px; margin-right: 10px;">📥</span>
                            <span>下载</span>
                        </div>
                        <div style="display: flex; align-items: center; padding: 12px; background: #e9ecef; border-radius: 6px; cursor: pointer;">
                            <span style="font-size: 24px; margin-right: 10px;">🎵</span>
                            <span>音乐</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getUserContent() {
        return `
            <div style="padding: 20px;">
                <h2>👤 博客信息</h2>
                <div style="display: flex; align-items: center; gap: 25px; margin-top: 20px; padding: 25px; background: #f8f9fa; border-radius: 12px;">
                    <div style="font-size: 64px; width: 100px; height: 100px; display: flex; align-items: center; justify-content: center; background: #e9ecef; border-radius: 50%; border: 3px solid #0078d7;">👤</div>
                    <div style="flex: 1;">
                        <h3 style="margin: 0 0 15px 0; font-size: 24px; color: #333;">${document.querySelector('.user-profile span').textContent}</h3>
                        <p style="margin: 8px 0; font-size: 16px; color: #555;">📧 2314125589@qq.com</p>
                        <p style="margin: 8px 0; font-size: 16px; color: #555;">💼 开发者</p>
                        <p style="margin: 8px 0; font-size: 16px; color: #555;">📍 CHINA</p>
                    </div>
                </div>
                
                <div style="margin-top: 30px;">
                    <h3>📊 TEST</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 15px;">
                        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #0078d7, #5a9bd4); color: white; border-radius: 8px;">
                            <div style="font-size: 28px; font-weight: bold;">12</div>
                            <div>TEST</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #28a745, #20c997); color: white; border-radius: 8px;">
                            <div style="font-size: 28px; font-weight: bold;">8</div>
                            <div>TEST</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #ffc107, #fd7e14); color: white; border-radius: 8px;">
                            <div style="font-size: 28px; font-weight: bold;">156</div>
                            <div>TEST</div>
                        </div>
                        <div style="text-align: center; padding: 20px; background: linear-gradient(135deg, #6f42c1, #e83e8c); color: white; border-radius: 8px;">
                            <div style="font-size: 28px; font-weight: bold;">3</div>
                            <div>TEST</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getProjectsContent() {
        return `
            <div style="padding: 20px;">
                <h2>📁 项目作品</h2>
                <div style="margin-top: 20px; display: grid; gap: 20px;">
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 5px solid #0078d7;">
                        <div style="display: flex; align-items: start; gap: 15px;">
                            <div style="font-size: 40px;">🌐</div>
                            <div style="flex: 1;">
                                <h3 style="margin: 0 0 10px 0;">个人博客系统</h3>
                                <p style="margin: 0 0 15px 0; color: #666;">基于Hexo的现代化博客主题，支持自定义布局和响应式设计。</p>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <span style="background: #0078d7; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">HTML/CSS</span>
                                    <span style="background: #28a745; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">JavaScript</span>
                                    <span style="background: #6f42c1; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">Hexo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 5px solid #28a745;">
                        <div style="display: flex; align-items: start; gap: 15px;">
                            <div style="font-size: 40px;">📱</div>
                            <div style="flex: 1;">
                                <h3 style="margin: 0 0 10px 0;">TEST</h3>
                                <p style="margin: 0 0 15px 0; color: #666;">TEST</p>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <span style="background: #61dafb; color: black; padding: 4px 12px; border-radius: 15px; font-size: 12px;">     </span>
                                    <span style="background: #339933; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">       </span>
                                    <span style="background: #4479a1; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">       </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 5px solid #ffc107;">
                        <div style="display: flex; align-items: start; gap: 15px;">
                            <div style="font-size: 40px;">💥</div>
                            <div style="flex: 1;">
                                <h3 style="margin: 0 0 10px 0;">TEST</h3>
                                <p style="margin: 0 0 15px 0; color: #666;">TEST</p>
                                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                    <span style="background: #ff6b35; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">     </span>
                                    <span style="background: #f7df1e; color: black; padding: 4px 12px; border-radius: 15px; font-size: 12px;">          </span>
                                    <span style="background: #000000; color: white; padding: 4px 12px; border-radius: 15px; font-size: 12px;">      </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    getBrowserContent() {
        return `
            <div style="height: 100%; display: flex; flex-direction: column;">
                <!-- 浏览器工具栏 -->
                <div style="padding: 12px 16px; background: #f5f5f5; border-bottom: 1px solid #e0e0e0; display: flex; gap: 8px; align-items: center; flex-shrink: 0;">
                    <button class="browser-btn" onclick="windowManager.browserGoBack()" title="后退">←</button>
                    <button class="browser-btn" onclick="windowManager.browserGoForward()" title="前进">→</button>
                    <button class="browser-btn" onclick="windowManager.browserRefresh()" title="刷新">↻</button>
                    <input type="text" id="browser-url" style="flex: 1; padding: 8px 12px; border: 1px solid #ccc; border-radius: 4px; font-size: 14px;" 
                           placeholder="输入网址或搜索..." value="https://www.baidu.com">
                    <button class="browser-btn" onclick="windowManager.browserGo()" style="background: #0078d7; color: white; padding: 8px 16px;">前往</button>
                </div>
                
                <!-- 书签栏 -->
                <div style="padding: 10px 16px; background: #f8f8f8; border-bottom: 1px solid #e0e0e0; display: flex; gap: 10px; flex-wrap: wrap; flex-shrink: 0;">
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://www.baidu.com')">🔍 百度</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://www.google.com')">🌐 Google</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://github.com')">💻 GitHub</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://stackoverflow.com')">❓ Stack Overflow</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://www.zhihu.com')">🤔 知乎</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://www.bilibili.com')">🎬 B站</button>
                    <button class="bookmark-btn" onclick="windowManager.browserOpenBookmark('https://douying.com')">⚡ 抖音</button>
                    <button class="bookmark-btn" onclick="windowManager.showBookmarkManager()">📑 管理书签</button>
                </div>
                
                <!-- 浏览器内容区域 -->
                <div id="browser-content" style="flex: 1; background: white; overflow: auto; position: relative;">
                    <div style="text-align: center; padding: 60px 20px;">
                        <div style="font-size: 64px; margin-bottom: 20px;">🌐</div>
                        <h2 style="margin-bottom: 15px;">我的浏览器</h2>
                        <p style="color: #666; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
                            在地址栏输入网址或点击上方书签开始浏览网页
                        </p>
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 600px; margin: 0 auto;">
                            <div class="quick-site" onclick="windowManager.browserOpenBookmark('https://www.baidu.com')">
                                <div style="font-size: 32px; margin-bottom: 10px;">🔍</div>
                                <div style="font-weight: bold;">百度搜索</div>
                                <div style="font-size: 12px; color: #666; margin-top: 5px;">信息检索</div>
                            </div>
                            <div class="quick-site" onclick="windowManager.browserOpenBookmark('https://github.com')">
                                <div style="font-size: 32px; margin-bottom: 10px;">💻</div>
                                <div style="font-weight: bold;">GitHub</div>
                                <div style="font-size: 12px; color: #666; margin-top: 5px;">代码托管</div>
                            </div>
                            <div class="quick-site" onclick="windowManager.browserOpenBookmark('https://www.zhihu.com')">
                                <div style="font-size: 32px; margin-bottom: 10px;">🤔</div>
                                <div style="font-weight: bold;">知乎</div>
                                <div style="font-size: 12px; color: #666; margin-top: 5px;">知识分享</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .browser-btn {
                    padding: 8px 12px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 14px;
                }
                .browser-btn:hover {
                    background: #f0f0f0;
                }
                .bookmark-btn {
                    padding: 6px 12px;
                    border: 1px solid #ddd;
                    border-radius: 15px;
                    background: white;
                    cursor: pointer;
                    font-size: 12px;
                    transition: all 0.2s;
                    white-space: nowrap;
                }
                .bookmark-btn:hover {
                    background: #0078d7;
                    color: white;
                    border-color: #0078d7;
                }
                .quick-site {
                    padding: 20px 15px;
                    border: 2px solid #e9ecef;
                    border-radius: 10px;
                    cursor: pointer;
                    text-align: center;
                    transition: all 0.3s;
                    background: white;
                }
                .quick-site:hover {
                    background: #f8f9fa;
                    border-color: #0078d7;
                    transform: translateY(-5px);
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                }
            </style>
        `;
    }

    getUtilitiesContent() {
        return `
            <div style="padding: 20px; height: 100%; overflow-y: auto;">
                <h2>🛠️ 实用工具</h2>
                
                <!-- 计算器 -->
                <div style="margin-bottom: 30px;">
                    <h3>🧮 计算器</h3>
                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px;">
                        <input type="text" id="calc-display" style="width: 100%; padding: 15px; font-size: 18px; text-align: right; border: 2px solid #ddd; border-radius: 8px; margin-bottom: 15px; background: white;" readonly value="0">
                        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;">
                            <button class="calc-btn" onclick="windowManager.calcClear()" style="background: #dc3545; color: white;">C</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('/')">/</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('*')">×</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('-')">-</button>
                            
                            <button class="calc-btn" onclick="windowManager.calcInput('7')">7</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('8')">8</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('9')">9</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('+')" style="grid-row: span 2; background: #0078d7; color: white;">+</button>
                            
                            <button class="calc-btn" onclick="windowManager.calcInput('4')">4</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('5')">5</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('6')">6</button>
                            
                            <button class="calc-btn" onclick="windowManager.calcInput('1')">1</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('2')">2</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('3')">3</button>
                            <button class="calc-btn" onclick="windowManager.calcCalculate()" style="grid-row: span 2; background: #28a745; color: white;">=</button>
                            
                            <button class="calc-btn" onclick="windowManager.calcInput('0')" style="grid-column: span 2">0</button>
                            <button class="calc-btn" onclick="windowManager.calcInput('.')">.</button>
                        </div>
                    </div>
                </div>
                
                <!-- 便签 -->
                <div style="margin-bottom: 30px;">
                    <h3>📝 便签</h3>
                    <div style="background: #fff3cd; border: 2px solid #ffeaa7; border-radius: 10px; padding: 0;">
                        <textarea id="notes-area" style="width: 100%; height: 150px; padding: 15px; border: none; background: transparent; resize: none; font-size: 14px; line-height: 1.5;" 
                                  placeholder="记录你的想法、待办事项或灵感..."></textarea>
                        <div style="padding: 12px 15px; background: #ffeaa7; border-top: 1px solid #fdcb6e; border-radius: 0 0 8px 8px; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-size: 12px; color: #666;">自动保存</span>
                            <div style="display: flex; gap: 8px;">
                                <button onclick="windowManager.saveNote()" style="padding: 6px 12px; background: #0078d7; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">保存</button>
                                <button onclick="windowManager.clearNote()" style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer; font-size: 12px;">清空</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 时钟和日期 -->
                <div>
                    <h3>⏰ 时钟</h3>
                    <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 10px; text-align: center;">
                        <div id="utility-date" style="font-size: 16px; margin-bottom: 10px; opacity: 0.9;">Loading...</div>
                        <div id="utility-clock" style="font-size: 32px; font-weight: bold; font-family: 'Courier New', monospace;">00:00:00</div>
                        <div style="margin-top: 15px; display: flex; justify-content: center; gap: 20px;">
                            <div>
                                <div style="font-size: 12px; opacity: 0.8;">时区</div>
                                <div style="font-size: 14px;">GMT+8</div>
                            </div>
                            <div>
                                <div style="font-size: 12px; opacity: 0.8;">位置</div>
                                <div style="font-size: 14px;">北京</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style>
                .calc-btn {
                    padding: 15px;
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    background: white;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 16px;
                    font-weight: bold;
                }
                .calc-btn:hover {
                    background: #f8f9fa;
                    transform: translateY(-1px);
                }
                .calc-btn:active {
                    background: #e9ecef;
                    transform: translateY(0);
                }
            </style>
        `;
    }

    getBlogContent() {
        return `
            <div style="padding: 20px;">
                <h2>📖 博客文章</h2>
                <p style="color: #666; margin-bottom: 25px;">欢迎访问我的技术博客，这是一个测试。</p>
                
                <div style="display: grid; gap: 20px;">
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #0078d7; cursor: pointer; transition: all 0.3s;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">TESTPASSAGE</h3>
                        <p style="margin: 0 0 12px 0; color: #666; line-height: 1.5;">TEST</p>
                        <div style="display: flex; gap: 15px; font-size: 12px; color: #888;">
                            <span>📅 2025-01-15</span>
                            <span>🏷️ TEST</span>
                            <span>⏱️ 阅读 分钟</span>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #28a745; cursor: pointer; transition: all 0.3s;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">TESTPASSAGE</h3>
                        <p style="margin: 0 0 12px 0; color: #666; line-height: 1.5;">TEST</p>
                        <div style="display: flex; gap: 15px; font-size: 12px; color: #888;">
                            <span>📅 2025-01-10</span>
                            <span>🏷️ TEST</span>
                            <span>⏱️ 阅读 分钟</span>
                        </div>
                    </div>
                    
                    <div style="padding: 20px; background: #f8f9fa; border-radius: 10px; border-left: 4px solid #ffc107; cursor: pointer; transition: all 0.3s;">
                        <h3 style="margin: 0 0 10px 0; color: #333;">TESTPASSAGE</h3>
                        <p style="margin: 0 0 12px 0; color: #666; line-height: 1.5;">TEST</p>
                        <div style="display: flex; gap: 15px; font-size: 12px; color: #888;">
                            <span>📅 2024-01-05</span>
                            <span>🏷️ TEST</span>
                            <span>⏱️ 阅读 分钟</span>
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button style="padding: 10px 20px; background: #0078d7; color: white; border: none; border-radius: 5px; cursor: pointer;">查看更多文章</button>
                </div>
            </div>
            
            <style>
                div[style*="background: #f8f9fa"]:hover {
                    background: #e9ecef !important;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
                }
            </style>
        `;
    }

    createWindow(config) {
        console.log('🪟 创建窗口:', config.id);
        
        const windowElement = document.createElement('div');
        windowElement.className = 'window';
        windowElement.id = config.id;
        windowElement.style.width = config.size.width + 'px';
        windowElement.style.height = config.size.height + 'px';
        windowElement.style.left = config.position.x + 'px';
        windowElement.style.top = config.position.y + 'px';
        windowElement.style.zIndex = ++this.zIndexCounter;

        windowElement.innerHTML = `
            <div class="window-header">
                <div class="window-title">${config.title}</div>
                <div class="window-controls">
                    <div class="window-control minimize" data-action="minimize">−</div>
                    <div class="window-control maximize" data-action="maximize">□</div>
                    <div class="window-control close" data-action="close">×</div>
                </div>
            </div>
            <div class="window-content">
                ${config.content}
            </div>
        `;

        const windowsContainer = document.getElementById('windows-container');
        if (windowsContainer) {
            windowsContainer.appendChild(windowElement);
            
            const windowState = {
                element: windowElement,
                app: config.app,
                isMinimized: false,
                isMaximized: false
            };
            
            this.windows.set(config.id, windowState);
            this.setupWindowInteractions(windowElement, config.id, windowState);
            this.addToTaskbar(config.title, config.id, windowState);
            
            console.log('✅ 窗口创建成功');
        }
    }

    setupWindowInteractions(windowElement, windowId, windowState) {
        const closeBtn = windowElement.querySelector('[data-action="close"]');
        const minimizeBtn = windowElement.querySelector('[data-action="minimize"]');
        const maximizeBtn = windowElement.querySelector('[data-action="maximize"]');

        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.closeWindow(windowId);
        });

        minimizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.minimizeWindow(windowId);
        });

        maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.maximizeWindow(windowId, windowState);
        });

        windowElement.addEventListener('mousedown', () => {
            this.focusWindow(windowId);
        });

        this.makeDraggable(windowElement);
    }

    makeDraggable(element) {
        const header = element.querySelector('.window-header');
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        header.addEventListener('mousedown', dragStart);
        
        function dragStart(e) {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = element.offsetLeft;
            initialY = element.offsetTop;
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', dragEnd);
        }
        
        function drag(e) {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            element.style.left = (initialX + dx) + 'px';
            element.style.top = (initialY + dy) + 'px';
        }
        
        function dragEnd() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', dragEnd);
        }
    }

    focusWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.style.zIndex = ++this.zIndexCounter;
        }
    }

    closeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.remove();
            this.windows.delete(windowId);
            this.removeFromTaskbar(windowId);
        }
    }

    minimizeWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window) {
            window.element.style.display = 'none';
            window.isMinimized = true;
            console.log('窗口已最小化:', windowId);
        }
    }

    restoreWindow(windowId) {
        const window = this.windows.get(windowId);
        if (window && window.isMinimized) {
            window.element.style.display = 'flex';
            window.isMinimized = false;
            this.focusWindow(windowId);
            console.log('窗口已恢复:', windowId);
        }
    }

    maximizeWindow(windowId, windowState) {
        const window = this.windows.get(windowId);
        if (window) {
            if (windowState.isMaximized) {
                window.element.style.width = '800px';
                window.element.style.height = '600px';
                window.element.style.left = '100px';
                window.element.style.top = '100px';
                windowState.isMaximized = false;
            } else {
                window.element.style.width = '100vw';
                window.element.style.height = 'calc(100vh - 48px)';
                window.element.style.left = '0';
                window.element.style.top = '0';
                windowState.isMaximized = true;
            }
            this.focusWindow(windowId);
        }
    }

    addToTaskbar(appName, windowId, windowState) {
        const taskbarApps = document.querySelector('.taskbar-apps');
        if (!taskbarApps) return;
        
        const appElement = document.createElement('div');
        appElement.className = 'taskbar-app';
        appElement.textContent = appName;
        appElement.dataset.windowId = windowId;

        appElement.addEventListener('click', () => {
            if (windowState.isMinimized) {
                this.restoreWindow(windowId);
            } else {
                this.minimizeWindow(windowId);
            }
        });

        taskbarApps.appendChild(appElement);
        this.taskbarApps.set(windowId, appElement);
    }

    removeFromTaskbar(windowId) {
        const appElement = this.taskbarApps.get(windowId);
        if (appElement) {
            appElement.remove();
            this.taskbarApps.delete(windowId);
        }
    }

    updateTime() {
        const timeElement = document.getElementById('current-time');
        if (!timeElement) return;
        
        const update = () => {
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('zh-CN', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: false 
            });
        };
        update();
        setInterval(update, 1000);
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const icon = document.querySelector('.theme-toggle .icon-emoji');
        if (icon) {
            if (document.body.classList.contains('dark-theme')) {
                icon.textContent = '🌙';
            } else {
                icon.textContent = '🌞';
            }
        }
    }

    showShutdownDialog() {
        if (confirm('确定要关闭系统吗？')) {
            document.body.innerHTML = `
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; flex-direction: column; gap: 20px;">
                    <div style="font-size: 48px;">⏻</div>
                    <div>系统正在关机...</div>
                </div>
            `;
        }
    }

    browserGo() {
        const urlInput = document.getElementById('browser-url');
        const content = document.getElementById('browser-content');
        const url = urlInput.value.trim();
        
        if (url) {
            window.open(url, '_blank');

            content.innerHTML = `
                <div style="text-align: center; padding: 60px 20px;">
                    <div style="font-size: 64px; margin-bottom: 20px;">🌐</div>
                    <h2>正在打开网页...</h2>
                    <p style="color: #666; margin: 15px 0; font-size: 16px;">${url}</p>
                    <div style="background: #e7f3ff; border: 1px solid #b3d9ff; border-radius: 8px; padding: 20px; max-width: 500px; margin: 20px auto;">
                        <p>🔗 网页已在新的浏览器标签页中打开</p>
                        <p style="font-size: 14px; color: #666; margin-top: 10px;">如果浏览器没有自动跳转，请检查弹出窗口阻止设置</p>
                    </div>
                </div>
            `;
        }
    }

    browserOpenBookmark(url) {
        const urlInput = document.getElementById('browser-url');
        urlInput.value = url;
        this.browserGo();
    }

    browserGoBack() {
        const content = document.getElementById('browser-content');
        content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>↩️ 后退功能</h3>
                <p>在真实浏览器中，这会带你返回上一页。</p>
            </div>
        `;
    }

    browserGoForward() {
        const content = document.getElementById('browser-content');
        content.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <h3>↪️ 前进功能</h3>
                <p>在真实浏览器中，这会带你前进到下一页。</p>
            </div>
        `;
    }

    browserRefresh() {
        this.browserGo();
    }

    showBookmarkManager() {
        const content = document.getElementById('browser-content');
        content.innerHTML = `
            <div style="padding: 20px;">
                <h2>📑 书签管理</h2>
                <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3>当前书签</h3>
                    <div style="display: grid; gap: 10px; margin-top: 15px;">
                        <div style="display: flex; justify-content: between; align-items: center; padding: 10px; background: white; border-radius: 6px;">
                            <span>🔍 百度</span>
                            <span style="color: #666; font-size: 12px; flex: 1; margin-left: 15px;">https://www.baidu.com</span>
                            <button style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;">删除</button>
                        </div>
                        <div style="display: flex; justify-content: between; align-items: center; padding: 10px; background: white; border-radius: 6px;">
                            <span>🌐 Google</span>
                            <span style="color: #666; font-size: 12px; flex: 1; margin-left: 15px;">https://www.google.com</span>
                            <button style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;">删除</button>
                        </div>
                        <div style="display: flex; justify-content: between; align-items: center; padding: 10px; background: white; border-radius: 6px;">
                            <span>💻 GitHub</span>
                            <span style="color: #666; font-size: 12px; flex: 1; margin-left: 15px;">https://github.com</span>
                            <button style="padding: 4px 8px; background: #dc3545; color: white; border: none; border-radius: 4px; font-size: 12px;">删除</button>
                        </div>
                    </div>
                </div>
                
                <div style="background: #e7f3ff; padding: 20px; border-radius: 8px;">
                    <h3>添加新书签</h3>
                    <div style="display: flex; gap: 10px; margin-top: 15px;">
                        <input type="text" id="new-bookmark-name" placeholder="书签名称" style="flex: 1; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        <input type="text" id="new-bookmark-url" placeholder="网址 (包含 https://)" style="flex: 2; padding: 10px; border: 1px solid #ccc; border-radius: 4px;">
                        <button onclick="windowManager.addNewBookmark()" style="padding: 10px 20px; background: #0078d7; color: white; border: none; border-radius: 4px; cursor: pointer;">添加</button>
                    </div>
                </div>
            </div>
        `;
    }

    addNewBookmark() {
        const name = document.getElementById('new-bookmark-name').value;
        const url = document.getElementById('new-bookmark-url').value;
        if (name && url) {
            alert(`已添加书签: ${name}\n${url}`);
            this.showBookmarkManager();
        }
    }

    calcInput(value) {
        const display = document.getElementById('calc-display');
        
        if (display.value === '0' || display.value === 'Error') {
            display.value = value;
        } else {
            display.value += value;
        }
    }

    calcClear() {
        document.getElementById('calc-display').value = '0';
    }

    calcCalculate() {
        const display = document.getElementById('calc-display');
        try {
            const result = eval(display.value.replace('×', '*'));
            display.value = result;
        } catch (e) {
            display.value = 'Error';
        }
    }

    saveNote() {
        const note = document.getElementById('notes-area').value;
        localStorage.setItem('os-notes', note);
        alert('便签已保存到本地存储！');
    }

    clearNote() {
        if (confirm('确定要清空便签吗？')) {
            document.getElementById('notes-area').value = '';
            localStorage.removeItem('os-notes');
        }
    }

    initUtilities() {
        const savedNote = localStorage.getItem('os-notes');
        if (savedNote) {
            const notesArea = document.getElementById('notes-area');
            if (notesArea) {
                notesArea.value = savedNote;
            }
        }
        
        function updateUtilityClock() {
            const clock = document.getElementById('utility-clock');
            const date = document.getElementById('utility-date');
            if (clock && date) {
                const now = new Date();
                clock.textContent = now.toLocaleTimeString('zh-CN');
                date.textContent = now.toLocaleDateString('zh-CN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                });
            }
        }
        setInterval(updateUtilityClock, 1000);
        updateUtilityClock();
    }
}

let windowManager;

document.addEventListener('DOMContentLoaded', function() {
    console.log('📄 DOM内容加载完成');
    windowManager = new WindowManager();
    
    setTimeout(() => {
        windowManager.initUtilities();
    }, 1000);
    
    console.log('🎉 系统初始化完成！');
});