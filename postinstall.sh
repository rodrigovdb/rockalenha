# Language Settings
export LANGUAGE=pt_BR.UTF-8
export LANG=pt_BR.UTF-8
export LC_ALL=pt_BR.UTF-8
locale-gen en_US.UTF-8
locale-gen pt_BR.UTF-8

aptitude update && aptitude safe-upgrade -y

# Install basic unix packages
aptitude install -y \
  bash-completion \
  build-essential \
  curl \
  git \
  tmux \
  vim \
  wget \
  htop
