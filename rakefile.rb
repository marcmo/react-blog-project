require 'rake'

APP_NAME="readable"
NODE_PATH="./node_modules"
NODE_BIN_PATH="#{NODE_PATH}/.bin"
REACT_CMD="#{NODE_BIN_PATH}/react-scripts-ts"
PACKAGE="./package.json"

def localExec(cmd)
  head, *tail = cmd.split(' ')
  localFile = "#{NODE_BIN_PATH}/#{head}"
  if File.exists? localFile
    head = localFile
  end
  puts "executing (#{localFile})"
  sh "#{head} #{tail.join(' ')}"
end
desc 'react start'
task :start do
  sh "#{REACT_CMD} start"
end
desc 'react build'
task :start do
  sh "#{REACT_CMD} build"
end
desc 'exec tests'
task :test do
  localExec "jest"
end
task :cleanReactCache do
  sh "rm -rf $TMPDIR/react-*"
end
task :cleanWatchman do
  sh "watchman watch-del-all"
end
task :clean => [:cleanReactCache, :cleanWatchman, "android:clean", "ios:clean"] do
  sh "npm cache clean --force"
end
desc 'clobber all setting files'
task :clobber => :clean do
	sh "rm -rf .DS_Store"
	sh "rm -rf node_modules/"
end
desc 'clean cache, node_modules, watchman, reinstall packages'
task :newclear => [:cleanReactCache, :cleanWatchman] do
  sh "rm -rf ios/build && rm -rf #{NODE_PATH} && npm cache clean --force"
  sh "yarn install"
end
desc 'burn down every cached resource and reinstall (may take some time)'
task :burn => [:cleanWatchman, :cleanReactCache] do
  sh "rm -rf #{NODE_PATH}"
  yarn_cache_dir = `yarn cache dir`
  sh "rm -rf #{yarn_cache_dir}"
  sh "yarn install"
end

def call_gradle(args)
  cd 'android' do
    sh "./gradlew #{args}"
  end
end
namespace :test do
  desc 'test & watch'
  task :watch do
    localExec "jest --watch"
  end
  desc 'update jest snapshots'
  task :snapshot do
    localExec "jest --updateSnapshot"
  end
  desc 'run jest with test coverage'
  task :coverage do
    localExec "jest --coverage && open coverage/lcov-report/index.html || xdg-open coverage/lcov-report/index.html"
  end
end

def lint(args)
  begin
    localExec "tslint -c tslint.json 'src/**/*.{ts,tsx}' -t stylish #{args}"
  rescue Exception => ex
    puts "tslint: #{ex.message}"
  end
end
def lintDeep(args)
  begin
    localExec "tslint --project tsconfig.json --config tslint.json 'src/**/*.{ts,tsx}' -t stylish #{args}"
  rescue Exception => ex
    puts "tslint: #{ex.message}"
  end
end
def tsc()
  begin
    localExec "tsc --pretty"
  rescue Exception => ex
    puts "tsc: #{ex.message}"
  end
end
desc 'run tslint'
task :lint do
  lint('')
  tsc()
end

desc 'run tslint (with --fix)'
task :fix do
  lint('--fix')
end

desc 'run tslint (with tsconfig integration)'
task :lintDeep do
  lintDeep('')
  tsc()
end

desc 'run tslint (with tsconfig integration and --fix)'
task :fixDeep do
  lintDeep('--fix')
  tsc()
end

namespace :git do
  task :hook do
    sh "npm run lint -s && npm run test -s"
  end
  desc 'show files ignored by git'
  task :ignored do
    sh "git status --ignored"
  end
end

class Version < Array
  def initialize s
    super(s.split('.').map { |e| e.to_i })
  end
  def < x
    (self <=> x) < 0
  end
  def > x
    (self <=> x) > 0
  end
  def == x
    (self <=> x) == 0
  end
  def inc
    minor = self.last
    self[0...-1].concat([minor + 1])
  end
  def to_s
    self.join(".")
  end
end

namespace :version do
  desc 'bump patch level'
  task :bump do
    new_version = update_package_version()
  end
end
def update_package_version
  require 'json'
  package_content = JSON.parse(File.read(PACKAGE))
  current_version = package_content["version"]
  v = Version.new(current_version)
  new_version = v.inc
  package_content["version"] = new_version.to_s
  File.open(PACKAGE,"w") do |f|
    f.write(JSON.pretty_generate(package_content))
  end
  return new_version
end
