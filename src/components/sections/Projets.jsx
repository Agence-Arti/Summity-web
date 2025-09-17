import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize } from 'lucide-react';
import ReactPlayer from 'react-player/vimeo';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

const projectsData = [
  {
    id: 1,
    title: "Projet Conceptuel : Modernisation de la Formation en Sécurité",
    description: "Le défi était de moderniser une formation SST jugée trop dense. Notre solution : une vidéo en motion design qui explique clairement les protocoles de manutention et de sécurité, renforçant l'engagement des équipes et la culture de la prévention.",
    vimeoUrl: 'https://vimeo.com/1117978703',
    thumbnailUrl: 'https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/0b8c25bc85b506751c829a044b5f4c75.png'
  },
  {
    id: 2,
    title: "Démystifier le Dépistage en Milieu Étudiant",
    description: "Cette vidéo a été créée pour un client fictif du secteur de la santé étudiante. L'objectif : transformer une procédure médicale sensible en un guide visuel clair et rassurant, afin de dédramatiser le processus et d'encourager les étudiants à prendre leur santé en main.",
    vimeoUrl: 'https://vimeo.com/1117982669',
    thumbnailUrl: 'https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/d102c549478ae4b38e644ceb61f2d45b.png'
  },
  {
    id: 3,
    title: "Projet Conceptuel : Formation Interne au Nouvel Outil 'Trade Shield'",
    description: "Ce projet conceptuel a été créé pour simuler une formation interne. L'objectif : expliquer aux employés d'une entreprise fictive comment utiliser le nouvel outil 'Trade Shield' pour automatiser et optimiser leur gestion du crédit client. La vidéo transforme un sujet technique en un guide simple et motivant.",
    vimeoUrl: 'https://vimeo.com/1117982881',
    thumbnailUrl: 'https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/d78c4570b69750a43a6aeaa905864ad4.png'
  },
  {
    id: 4,
    title: "Module de Formation (Fictif) : Prise en main de l'Outil IA 'SalesXcelerator'",
    description: "Ce projet conceptuel simule une vidéo de formation interne pour 'Xcela.ai', une entreprise fictive. Le but est d'accompagner les agents d'assurance dans l'adoption de leur nouvel outil IA, en remplaçant les processus papier complexes par une plateforme numérique simple et efficace. La vidéo sert de guide rapide pour maîtriser les fonctionnalités clés et optimiser leur performance.",
    vimeoUrl: 'https://vimeo.com/1117988389',
    thumbnailUrl: 'https://horizons-cdn.hostinger.com/f7346e70-63d8-482a-b6ef-6d16c7218e17/e9beabe7a5a420f3d26abcad133724e6.png'
  }
];

const formatTime = (timeInSeconds) => {
  if (isNaN(timeInSeconds) || timeInSeconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const ProjectCard = ({ project, handleNotImplemented }) => {
  const { t } = useTranslation();
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [playerState, setPlayerState] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoContainerRef = useRef(null);
  
  const title = project.title || t(project.titleKey);

  useEffect(() => {
    let interval;
    if (playerRef.current && playerState) {
      interval = setInterval(() => {
        if (playerRef.current) {
          const time = playerRef.current.getCurrentTime();
          if (typeof time === 'number') {
              setCurrentTime(time);
          }
        }
      }, 250);
    }
    return () => clearInterval(interval);
  }, [playerState]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isCurrentlyFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isCurrentlyFullscreen);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handlePlay = () => {
    if (project.vimeoUrl || project.youtubeId) {
      setIsPlaying(true);
    } else {
      handleNotImplemented();
    }
  };

  const handlePlayerReady = () => {
    setIsReady(true);
    if (playerRef.current) {
      const dur = playerRef.current.getDuration();
      if (dur) {
        setDuration(dur);
      }
    }
  };

  const onProgress = (state) => {
    setCurrentTime(state.playedSeconds);
  };

  const onDuration = (duration) => {
    setDuration(duration);
  };

  const togglePlay = () => {
    if (!playerRef.current) return;
    setPlayerState(prev => !prev);
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  const handleSeek = (value) => {
    if (!playerRef.current) return;
    const seekToTime = value[0];
    setCurrentTime(seekToTime);
    playerRef.current.seekTo(seekToTime);
  };
  
  const toggleFullscreen = () => {
    const container = videoContainerRef.current;
    if (!container) return;

    if (!document.fullscreenElement) {
        container.requestFullscreen().catch(err => {
            alert(`Erreur : Impossible de passer en plein écran. Le navigateur a peut-être bloqué cette action pour des raisons de sécurité. (${err.name})`);
        });
    } else {
        document.exitFullscreen();
    }
  };

  const playerConfig = {
    vimeo: {
      playerOptions: {
        controls: 0,
        autoplay: 1,
        transparent: 1,
        loop: 0
      }
    },
    youtube: {
      playerVars: {
        controls: 0,
        autoplay: 1,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
        showinfo: 0,
        iv_load_policy: 3,
      },
    }
  };

  const videoUrl = project.vimeoUrl || (project.youtubeId ? `https://www.youtube.com/watch?v=${project.youtubeId}` : null);
  const lightProp = project.vimeoUrl ? (project.thumbnailUrl || true) : (project.youtubeId ? true : false);

  if (isPlaying) {
    return (
      <div ref={videoContainerRef} className="relative overflow-hidden rounded-2xl shadow-lg aspect-video group bg-black">
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={playerState}
          muted={isMuted}
          volume={isMuted ? 0 : 1}
          width="100%"
          height="100%"
          onReady={handlePlayerReady}
          onProgress={onProgress}
          onDuration={onDuration}
          onPlay={() => setPlayerState(true)}
          onPause={() => setPlayerState(false)}
          onEnded={() => setPlayerState(false)}
          controls={false}
          config={playerConfig}
        />
        <div className="absolute inset-0 flex flex-col justify-between opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 via-transparent to-black/20">
          <div></div>
          <div className="p-2 sm:p-4 flex items-center gap-1 sm:gap-3 text-white">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={togglePlay}>
              {playerState ? <Pause className="w-5 h-5 sm:w-6 sm:h-6" /> : <Play className="w-5 h-5 sm:w-6 sm:h-6" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
            <span className="text-xs sm:text-sm font-mono w-12 text-center">{formatTime(currentTime)}</span>
            <Slider
              value={[currentTime]}
              max={duration}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <span className="text-xs sm:text-sm font-mono w-12 text-center">{formatTime(duration)}</span>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white" onClick={toggleMute}>
              {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group cursor-pointer" onClick={handlePlay}>
      <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-in-out group-hover:shadow-2xl group-hover:border-2 group-hover:border-[hsl(var(--royal-blue))] p-0.5">
        <div className="transition-transform duration-400 group-hover:scale-105">
          {videoUrl ? (
            <ReactPlayer
              url={videoUrl}
              light={lightProp}
              playing={false}
              controls={false}
              width="100%"
              height="100%"
              className="w-full h-auto aspect-video object-cover"
              config={playerConfig}
            />
          ) : (
            <img  className="w-full h-auto aspect-video object-cover" alt={title} src="https://images.unsplash.com/photo-1572177812156-58036aae439c" />
          )}
        </div>
      </div>
    </div>
  );
};

const AnimatedProjectCard = ({ project, handleNotImplemented }) => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "0.9 1"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.4, 1]);
  const [isExpanded, setIsExpanded] = useState(false);

  const isCustomProject = !!project.description;
  const title = isCustomProject ? project.title : t(project.titleKey);

  let descriptionBlock;
  if (isCustomProject) {
    const fullText = project.description;
    const previewText = fullText.substring(0, fullText.indexOf('.') + 1);
    const remainingText = fullText.substring(fullText.indexOf('.') + 1).trim();

    descriptionBlock = (
      <>
        <motion.p layout="position" className="text-sm md:text-base text-muted-foreground mt-1">
          {previewText}
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {' '}{remainingText}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.p>
        <Button
          variant="link"
          className="p-0 h-auto text-sm font-semibold text-[hsl(var(--royal-blue))] hover:text-[hsl(var(--royal-blue-dark))] mt-2"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Voir moins..." : "Voir plus..."}
        </Button>
      </>
    );
  } else {
    descriptionBlock = <p className="text-sm md:text-base text-muted-foreground mt-1">{t(project.descriptionKey)}</p>;
  }

  return (
    <motion.div
      layout
      ref={ref}
      style={{ scale, opacity }}
      className="group relative transition-all duration-300 ease-in-out"
    >
      <ProjectCard project={project} handleNotImplemented={handleNotImplemented} />
      <div className="mt-4">
        <h3 className="text-lg md:text-xl font-bold text-foreground">{title}</h3>
        {descriptionBlock}
      </div>
    </motion.div>
  );
};


const Projets = ({ handleNotImplemented }) => {
  const { t } = useTranslation();
  return (
    <section id="projets" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-8">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">{t('projects.title')}</h2>
          <p className="text-base md:text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            La nature de notre travail implique souvent des informations stratégiques pour nos clients. Par respect pour nos ententes de confidentialité, nous présentons ici des projets fictifs qui démontrent fidèlement nos compétences en motion design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-12 gap-y-12 md:gap-y-16">
          {projectsData.map((project) => (
            <AnimatedProjectCard key={project.id} project={project} handleNotImplemented={handleNotImplemented} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projets;